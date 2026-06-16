import 'vital.dart';

class Patient {
  final String id;
  final String name;
  final String gender;
  final String age;
  final String diagnosis;
  final String support;
  final String bed;
  final String ward;
  final String dutyPhone;
  final Map<VitalType, VitalThreshold> thresholds;
  final Map<VitalType, double> vitals;
  final Map<VitalType, SimConfig> sim;

  Patient({
    required this.id,
    required this.name,
    required this.gender,
    required this.age,
    required this.diagnosis,
    required this.support,
    required this.bed,
    required this.ward,
    required this.dutyPhone,
    required this.thresholds,
    required this.vitals,
    required this.sim,
  });

  Patient copyWith({Map<VitalType, double>? vitals, Map<VitalType, VitalThreshold>? thresholds}) {
    return Patient(
      id: id,
      name: name,
      gender: gender,
      age: age,
      diagnosis: diagnosis,
      support: support,
      bed: bed,
      ward: ward,
      dutyPhone: dutyPhone,
      thresholds: thresholds ?? this.thresholds,
      vitals: vitals ?? this.vitals,
      sim: sim,
    );
  }

  String get worstSeverity {
    String worst = 'stable';
    for (final vt in VitalType.values) {
      final val = vitals[vt];
      final thr = thresholds[vt];
      if (val == null || thr == null) continue;
      final sev = thr.severity(val);
      if (sev == 'critical') return 'critical';
      if (sev == 'warning') worst = 'warning';
    }
    return worst;
  }

  int get mapValue {
    final sbp = vitals[VitalType.sbp] ?? 0;
    final dbp = vitals[VitalType.dbp] ?? 0;
    return ((sbp + 2 * dbp) / 3).round();
  }
}
