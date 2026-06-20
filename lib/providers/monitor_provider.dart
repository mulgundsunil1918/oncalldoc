import 'dart:async';
import 'dart:math';

import 'package:flutter/foundation.dart';

import '../models/alert.dart';
import '../models/comment.dart';
import '../models/patient.dart';
import '../models/vital.dart';
import '../data/seed_patients.dart';

class MonitorProvider extends ChangeNotifier {
  List<Patient> _patients = [];
  List<Alert> _alerts = [];
  List<Comment> _comments = [];
  bool _soundEnabled = true;
  Timer? _simTimer;
  final _rng = Random();

  // Debounce: track last alert time per patient+vital to avoid spam
  final Map<String, DateTime> _lastAlertTime = {};

  // Vitals history for trend charts: patientId → list of timestamped readings
  final Map<String, List<VitalSnapshot>> _history = {};
  static const int _maxHistory = 2200; // ~12 hrs at 1 reading per 20s

  List<Patient> get patients => _patients;
  List<Alert> get alerts => _alerts;
  List<Comment> get comments => _comments;
  bool get soundEnabled => _soundEnabled;

  List<VitalSnapshot> historyFor(String patientId) => _history[patientId] ?? [];

  void init() {
    _patients = List.from(seedPatients);
    _comments = List.from(seedComments);
    _seedHistory();
    _startSimulation();
  }

  void _seedHistory() {
    final now = DateTime.now();
    for (final p in _patients) {
      final snapshots = <VitalSnapshot>[];
      var vitals = Map<VitalType, double>.from(p.vitals);
      for (int i = 720; i >= 0; i--) {
        final time = now.subtract(Duration(minutes: i));
        final newVitals = <VitalType, double>{};
        for (final vt in VitalType.values) {
          if (vt == VitalType.map) continue;
          final cfg = p.sim[vt];
          if (cfg == null) { newVitals[vt] = vitals[vt] ?? 0; continue; }
          newVitals[vt] = _simStep(vitals[vt] ?? cfg.base, cfg).roundToDouble();
          final meta = VitalMeta.all[vt]!;
          newVitals[vt] = newVitals[vt]!.clamp(meta.min, meta.max);
        }
        final sbp = newVitals[VitalType.sbp] ?? 0;
        final dbp = newVitals[VitalType.dbp] ?? 0;
        newVitals[VitalType.map] = ((sbp + 2 * dbp) / 3).roundToDouble();
        vitals = newVitals;
        snapshots.add(VitalSnapshot(time, Map.from(newVitals)));
      }
      _history[p.id] = snapshots;
    }
  }

  @override
  void dispose() {
    _simTimer?.cancel();
    super.dispose();
  }

  void toggleSound() {
    _soundEnabled = !_soundEnabled;
    notifyListeners();
  }

  void addComment(String patientId, String text, String type) {
    _comments.insert(
      0,
      Comment(
        id: DateTime.now().millisecondsSinceEpoch.toString(),
        patientId: patientId,
        text: text,
        author: 'Dr. Sunil',
        time: DateTime.now(),
        type: type,
      ),
    );
    notifyListeners();
  }

  void setThreshold(String patientId, VitalType vital, String key, double value) {
    final idx = _patients.indexWhere((p) => p.id == patientId);
    if (idx < 0) return;
    final patient = _patients[idx];
    final old = patient.thresholds[vital] ?? const VitalThreshold();
    final updated = VitalThreshold(
      warnLow: key == 'warnLow' ? value : old.warnLow,
      critLow: key == 'critLow' ? value : old.critLow,
      warnHigh: key == 'warnHigh' ? value : old.warnHigh,
      critHigh: key == 'critHigh' ? value : old.critHigh,
    );
    final newThresholds = Map<VitalType, VitalThreshold>.from(patient.thresholds);
    newThresholds[vital] = updated;
    _patients[idx] = patient.copyWith(thresholds: newThresholds);
    notifyListeners();
  }

  void addPatient(Patient patient) {
    _patients.add(patient);
    notifyListeners();
  }

  List<Comment> commentsFor(String patientId) =>
      _comments.where((c) => c.patientId == patientId).toList();

  List<Alert> alertsFor(String patientId) =>
      _alerts.where((a) => a.patientId == patientId).toList();

  Patient? patientById(String id) {
    for (final p in _patients) {
      if (p.id == id) return p;
    }
    return null;
  }

  // ── Simulation engine (Ornstein-Uhlenbeck random walk) ──

  void _startSimulation() {
    _simTimer?.cancel();
    _simTimer = Timer.periodic(const Duration(seconds: 2), (_) => _simTick());
  }

  double _simStep(double current, SimConfig cfg) {
    final pull = 0.08 * (cfg.base - current);
    final noise = ((_rng.nextDouble() * 2) - 1) * cfg.range;
    double next = current + pull + noise;
    next = next.clamp(cfg.base - cfg.maxDrift, cfg.base + cfg.maxDrift);
    return next;
  }

  void _simTick() {
    for (int i = 0; i < _patients.length; i++) {
      final p = _patients[i];
      final newVitals = <VitalType, double>{};

      for (final vt in VitalType.values) {
        if (vt == VitalType.map) continue;
        final current = p.vitals[vt] ?? 0;
        final cfg = p.sim[vt];
        if (cfg == null) {
          newVitals[vt] = current;
          continue;
        }
        newVitals[vt] = _simStep(current, cfg).roundToDouble();
      }

      // MAP derived
      final sbp = newVitals[VitalType.sbp] ?? 0;
      final dbp = newVitals[VitalType.dbp] ?? 0;
      newVitals[VitalType.map] = ((sbp + 2 * dbp) / 3).roundToDouble();

      // Clamp to valid ranges
      for (final vt in VitalType.values) {
        final meta = VitalMeta.all[vt]!;
        newVitals[vt] = (newVitals[vt] ?? 0).clamp(meta.min, meta.max);
      }

      _patients[i] = p.copyWith(vitals: newVitals);
      _checkAlerts(p.id, newVitals, p.thresholds);

      // Record history
      _history.putIfAbsent(p.id, () => []);
      _history[p.id]!.add(VitalSnapshot(DateTime.now(), Map.from(newVitals)));
      if (_history[p.id]!.length > _maxHistory) {
        _history[p.id]!.removeAt(0);
      }
    }
    notifyListeners();
  }

  void _checkAlerts(String patientId, Map<VitalType, double> vitals, Map<VitalType, VitalThreshold> thresholds) {
    for (final vt in VitalType.values) {
      final val = vitals[vt];
      final thr = thresholds[vt];
      if (val == null || thr == null) continue;

      final sev = thr.severity(val);
      if (sev == 'stable') continue;

      final key = '$patientId-${vt.name}-$sev';
      final last = _lastAlertTime[key];
      if (last != null && DateTime.now().difference(last).inSeconds < 20) continue;

      final meta = VitalMeta.all[vt]!;
      final isLow = (thr.critLow != null && val < thr.critLow!) ||
                     (thr.warnLow != null && val < thr.warnLow!);
      final direction = isLow ? 'below' : 'above';
      final label = vt == VitalType.spo2 ? 'SpO₂' : meta.label;
      final unit = meta.unit;

      _alerts.insert(
        0,
        Alert(
          id: DateTime.now().microsecondsSinceEpoch.toString(),
          patientId: patientId,
          message: '$label $direction ${sev == "critical" ? "critical" : "warning"}: ${val.round()}$unit',
          severity: sev,
          time: DateTime.now(),
        ),
      );
      _lastAlertTime[key] = DateTime.now();
    }
  }
}

class VitalSnapshot {
  final DateTime time;
  final Map<VitalType, double> vitals;
  const VitalSnapshot(this.time, this.vitals);
}
