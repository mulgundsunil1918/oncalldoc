import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';

import '../../models/patient.dart';
import '../../models/vital.dart';
import '../../providers/monitor_provider.dart';
import '../../providers/theme_provider.dart';
import '../../utils/app_theme.dart';
import '../../data/seed_patients.dart';
import 'monitor_screen.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  String _greeting() {
    final h = DateTime.now().hour;
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  }

  @override
  Widget build(BuildContext context) {
    final monitor = context.watch<MonitorProvider>();
    final theme = context.watch<ThemeProvider>();
    final patients = monitor.patients;
    final critCount = patients.where((p) => p.worstSeverity == 'critical').length;
    final warnCount = patients.where((p) => p.worstSeverity == 'warning').length;
    final stableCount = patients.where((p) => p.worstSeverity == 'stable').length;
    final critAlerts = monitor.alerts.where((a) => a.severity == 'critical').length;

    return Scaffold(
      backgroundColor: AppColors.surface,
      body: CustomScrollView(
        slivers: [
          // ── App bar ──
          SliverAppBar(
            floating: true,
            backgroundColor: AppColors.appBarBg,
            title: Row(
              children: [
                Text(
                  'OnCallDoc',
                  style: GoogleFonts.dmSans(
                    fontWeight: FontWeight.w800,
                    fontSize: 20,
                    color: AppColors.primary,
                  ),
                ),
                const SizedBox(width: 8),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                  decoration: BoxDecoration(
                    color: AppColors.primary.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(6),
                  ),
                  child: Text(
                    'MVP',
                    style: GoogleFonts.dmSans(
                      fontSize: 10,
                      fontWeight: FontWeight.w700,
                      color: AppColors.primary,
                    ),
                  ),
                ),
              ],
            ),
            actions: [
              IconButton(
                icon: Icon(
                  theme.isDark ? Icons.light_mode : Icons.dark_mode,
                  color: AppColors.textSecondary,
                ),
                onPressed: () => theme.toggle(),
              ),
              Stack(
                children: [
                  IconButton(
                    icon: Icon(Icons.notifications_outlined, color: AppColors.textSecondary),
                    onPressed: () {},
                  ),
                  if (critAlerts > 0)
                    Positioned(
                      right: 6,
                      top: 6,
                      child: Container(
                        padding: const EdgeInsets.all(4),
                        decoration: const BoxDecoration(
                          color: AppColors.critical,
                          shape: BoxShape.circle,
                        ),
                        child: Text(
                          '$critAlerts',
                          style: const TextStyle(color: Colors.white, fontSize: 9, fontWeight: FontWeight.bold),
                        ),
                      ),
                    ),
                ],
              ),
            ],
          ),

          // ── Hero section ──
          SliverToBoxAdapter(
            child: Container(
              margin: const EdgeInsets.all(16),
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFF0A5C8A), Color(0xFF0E7C5F)],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(20),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    '${_greeting()}, Dr. Sunil',
                    style: GoogleFonts.dmSans(
                      color: Colors.white70,
                      fontSize: 14,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Your patients.\nYour eyes.\nFrom anywhere.',
                    style: GoogleFonts.dmSans(
                      color: Colors.white,
                      fontSize: 26,
                      fontWeight: FontWeight.w800,
                      height: 1.2,
                    ),
                  ),
                  const SizedBox(height: 16),
                  // Stats row
                  Row(
                    children: [
                      _statChip('${patients.length}', 'Patients', Colors.white),
                      if (critCount > 0) _statChip('$critCount', 'Critical', AppColors.critical),
                      if (warnCount > 0) _statChip('$warnCount', 'Watch', AppColors.warningColor),
                      _statChip('$stableCount', 'Stable', AppColors.stable),
                    ],
                  ),
                ],
              ),
            ),
          ),

          // ── Patient list header ──
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Active patients',
                        style: GoogleFonts.dmSans(
                          color: AppColors.textPrimary,
                          fontSize: 18,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                      Text(
                        _formattedDate(),
                        style: GoogleFonts.dmSans(
                          color: AppColors.textSecondary,
                          fontSize: 12,
                        ),
                      ),
                    ],
                  ),
                  ElevatedButton.icon(
                    onPressed: () => _showAddPatient(context, monitor),
                    icon: const Icon(Icons.add, size: 18),
                    label: const Text('Add patient'),
                    style: ElevatedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                      textStyle: GoogleFonts.dmSans(fontSize: 13, fontWeight: FontWeight.w600),
                    ),
                  ),
                ],
              ),
            ),
          ),

          const SliverToBoxAdapter(child: SizedBox(height: 12)),

          // ── Patient cards ──
          SliverPadding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            sliver: SliverList(
              delegate: SliverChildBuilderDelegate(
                (context, index) {
                  final p = patients[index];
                  return _patientCard(context, p, monitor);
                },
                childCount: patients.length,
              ),
            ),
          ),

          const SliverToBoxAdapter(child: SizedBox(height: 80)),
        ],
      ),
    );
  }

  Widget _statChip(String num, String label, Color color) {
    return Expanded(
      child: Container(
        margin: const EdgeInsets.only(right: 8),
        padding: const EdgeInsets.symmetric(vertical: 10),
        decoration: BoxDecoration(
          color: Colors.white.withOpacity(0.15),
          borderRadius: BorderRadius.circular(10),
        ),
        child: Column(
          children: [
            Text(
              num,
              style: GoogleFonts.dmSans(
                color: color == Colors.white ? Colors.white : color,
                fontSize: 22,
                fontWeight: FontWeight.w800,
              ),
            ),
            Text(
              label,
              style: GoogleFonts.dmSans(
                color: Colors.white70,
                fontSize: 10,
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _patientCard(BuildContext context, Patient p, MonitorProvider monitor) {
    final sev = p.worstSeverity;
    final sevColor = sev == 'critical'
        ? AppColors.critical
        : sev == 'warning'
            ? AppColors.warningColor
            : AppColors.stable;
    final alerts = monitor.alertsFor(p.id);
    final lastAlert = alerts.isNotEmpty ? alerts.first : null;

    return GestureDetector(
      onTap: () => Navigator.push(
        context,
        MaterialPageRoute(builder: (_) => MonitorScreen(patientId: p.id)),
      ),
      child: Container(
        margin: const EdgeInsets.only(bottom: 12),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: AppColors.card,
          borderRadius: BorderRadius.circular(16),
          border: Border(
            left: BorderSide(color: sevColor, width: 4),
          ),
          boxShadow: AppColors.cardShadow,
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header row
            Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        p.name,
                        style: GoogleFonts.dmSans(
                          color: AppColors.textPrimary,
                          fontSize: 16,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                      Text(
                        '${p.gender} · ${p.age} · ${p.ward}',
                        style: GoogleFonts.dmSans(
                          color: AppColors.textSecondary,
                          fontSize: 12,
                        ),
                      ),
                    ],
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: sevColor.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    sev == 'critical' ? '🔴 Critical' : sev == 'warning' ? '🟡 Watch' : '🟢 Stable',
                    style: GoogleFonts.dmSans(
                      color: sevColor,
                      fontSize: 11,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 6),
            Text(
              '${p.diagnosis} · ${p.support} · ${p.bed}',
              style: GoogleFonts.dmSans(
                color: AppColors.textSecondary,
                fontSize: 12,
              ),
            ),
            const SizedBox(height: 12),
            // Mini vitals
            Row(
              children: [
                _miniVital('HR', p.vitals[VitalType.hr]?.round().toString() ?? '-',
                    p.thresholds[VitalType.hr]?.severity(p.vitals[VitalType.hr] ?? 0) ?? 'stable'),
                _miniVital('SpO₂', '${p.vitals[VitalType.spo2]?.round() ?? '-'}%',
                    p.thresholds[VitalType.spo2]?.severity(p.vitals[VitalType.spo2] ?? 0) ?? 'stable'),
                _miniVital('RR', p.vitals[VitalType.rr]?.round().toString() ?? '-',
                    p.thresholds[VitalType.rr]?.severity(p.vitals[VitalType.rr] ?? 0) ?? 'stable'),
                _miniVitalBP(p),
              ],
            ),
            if (lastAlert != null) ...[
              const SizedBox(height: 8),
              Row(
                children: [
                  Icon(
                    Icons.warning_amber,
                    size: 12,
                    color: lastAlert.severity == 'critical' ? AppColors.critical : AppColors.warningColor,
                  ),
                  const SizedBox(width: 4),
                  Expanded(
                    child: Text(
                      lastAlert.message,
                      style: GoogleFonts.dmSans(
                        color: lastAlert.severity == 'critical' ? AppColors.critical : AppColors.warningColor,
                        fontSize: 11,
                      ),
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ],
              ),
            ],
            const SizedBox(height: 6),
            Text(
              'Tap to monitor →',
              style: GoogleFonts.dmSans(
                color: AppColors.primary,
                fontSize: 11,
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _miniVital(String label, String value, String sev) {
    final color = sev == 'critical'
        ? AppColors.critical
        : sev == 'warning'
            ? AppColors.warningColor
            : AppColors.textPrimary;
    return Expanded(
      child: Column(
        children: [
          Text(label, style: GoogleFonts.dmSans(color: AppColors.textSecondary, fontSize: 10, fontWeight: FontWeight.w600)),
          const SizedBox(height: 2),
          Text(value, style: GoogleFonts.dmSans(color: color, fontSize: 16, fontWeight: FontWeight.w800)),
        ],
      ),
    );
  }

  Widget _miniVitalBP(Patient p) {
    final sbp = p.vitals[VitalType.sbp]?.round() ?? 0;
    final dbp = p.vitals[VitalType.dbp]?.round() ?? 0;
    final map = p.vitals[VitalType.map]?.round() ?? 0;
    String bpSev = 'stable';
    for (final vt in [VitalType.sbp, VitalType.dbp, VitalType.map]) {
      final s = p.thresholds[vt]?.severity(p.vitals[vt] ?? 0) ?? 'stable';
      if (s == 'critical') { bpSev = 'critical'; break; }
      if (s == 'warning') bpSev = 'warning';
    }
    final color = bpSev == 'critical'
        ? AppColors.critical
        : bpSev == 'warning'
            ? AppColors.warningColor
            : AppColors.textPrimary;
    return Expanded(
      child: Column(
        children: [
          Text('BP', style: GoogleFonts.dmSans(color: AppColors.textSecondary, fontSize: 10, fontWeight: FontWeight.w600)),
          const SizedBox(height: 2),
          Text('$sbp/$dbp', style: GoogleFonts.dmSans(color: color, fontSize: 16, fontWeight: FontWeight.w800)),
          Text('MAP $map', style: GoogleFonts.dmSans(color: AppColors.textSecondary, fontSize: 9)),
        ],
      ),
    );
  }

  String _formattedDate() {
    final now = DateTime.now();
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return '${days[now.weekday - 1]}, ${now.day} ${months[now.month - 1]} ${now.year}';
  }

  void _showAddPatient(BuildContext context, MonitorProvider monitor) {
    final nameCtrl = TextEditingController();
    final ageCtrl = TextEditingController();
    final diagCtrl = TextEditingController();
    final supportCtrl = TextEditingController();
    final bedCtrl = TextEditingController();
    String gender = 'M';
    String ward = 'ICU';

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: AppColors.card,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (ctx) => StatefulBuilder(
        builder: (ctx, setState2) => Padding(
          padding: EdgeInsets.only(
            left: 20, right: 20, top: 20,
            bottom: MediaQuery.of(ctx).viewInsets.bottom + 20,
          ),
          child: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Add patient', style: GoogleFonts.dmSans(
                  color: AppColors.textPrimary, fontSize: 20, fontWeight: FontWeight.w700,
                )),
                const SizedBox(height: 16),
                TextField(controller: nameCtrl, decoration: const InputDecoration(labelText: 'Patient name')),
                const SizedBox(height: 10),
                Row(children: [
                  Expanded(child: TextField(controller: ageCtrl, decoration: const InputDecoration(labelText: 'Age'))),
                  const SizedBox(width: 10),
                  Expanded(
                    child: DropdownButtonFormField<String>(
                      value: gender,
                      decoration: const InputDecoration(labelText: 'Gender'),
                      items: const [
                        DropdownMenuItem(value: 'M', child: Text('Male')),
                        DropdownMenuItem(value: 'F', child: Text('Female')),
                      ],
                      onChanged: (v) => setState2(() => gender = v!),
                    ),
                  ),
                ]),
                const SizedBox(height: 10),
                DropdownButtonFormField<String>(
                  value: ward,
                  decoration: const InputDecoration(labelText: 'Ward'),
                  items: ['ICU', 'NICU', 'PICU', 'MICU', 'Post-op Ward', 'HDU', 'Labor Room', 'General Ward', 'Emergency']
                      .map((w) => DropdownMenuItem(value: w, child: Text(w))).toList(),
                  onChanged: (v) => setState2(() => ward = v!),
                ),
                const SizedBox(height: 10),
                TextField(controller: diagCtrl, decoration: const InputDecoration(labelText: 'Diagnosis')),
                const SizedBox(height: 10),
                Row(children: [
                  Expanded(child: TextField(controller: supportCtrl, decoration: const InputDecoration(labelText: 'Support'))),
                  const SizedBox(width: 10),
                  Expanded(child: TextField(controller: bedCtrl, decoration: const InputDecoration(labelText: 'Bed'))),
                ]),
                const SizedBox(height: 20),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: () {
                      if (nameCtrl.text.trim().isEmpty) return;
                      monitor.addPatient(Patient(
                        id: DateTime.now().millisecondsSinceEpoch.toString(),
                        name: nameCtrl.text.trim(),
                        gender: gender,
                        age: ageCtrl.text.trim(),
                        diagnosis: diagCtrl.text.trim(),
                        support: supportCtrl.text.trim(),
                        bed: bedCtrl.text.trim(),
                        ward: ward,
                        dutyPhone: '+910000000000',
                        thresholds: Map.from(defaultAdultThresholds),
                        vitals: {
                          VitalType.hr: 80, VitalType.spo2: 96, VitalType.rr: 16,
                          VitalType.sbp: 120, VitalType.dbp: 75, VitalType.map: 90,
                        },
                        sim: {
                          VitalType.hr: SimConfig(base: 80, range: 5, maxDrift: 15),
                          VitalType.spo2: SimConfig(base: 96, range: 1, maxDrift: 4),
                          VitalType.rr: SimConfig(base: 16, range: 2, maxDrift: 6),
                          VitalType.sbp: SimConfig(base: 120, range: 6, maxDrift: 18),
                          VitalType.dbp: SimConfig(base: 75, range: 4, maxDrift: 12),
                        },
                      ));
                      Navigator.pop(ctx);
                    },
                    child: const Text('Add patient'),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
