import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../models/vital.dart';
import '../../providers/monitor_provider.dart';
import '../../providers/theme_provider.dart';
import '../../utils/app_theme.dart';
import '../../widgets/vital_card.dart';
import '../../widgets/bp_card.dart';
import '../../widgets/alert_log.dart';
import '../../widgets/comment_panel.dart';
import '../../widgets/threshold_panel.dart';
import 'vital_trends_screen.dart';

class MonitorScreen extends StatelessWidget {
  final String patientId;

  const MonitorScreen({super.key, required this.patientId});

  @override
  Widget build(BuildContext context) {
    final monitor = context.watch<MonitorProvider>();
    context.watch<ThemeProvider>();
    final patient = monitor.patientById(patientId);

    if (patient == null) {
      return Scaffold(
        appBar: AppBar(title: const Text('Patient not found')),
        body: const Center(child: Text('Patient not found')),
      );
    }

    final sev = patient.worstSeverity;
    final sevColor = sev == 'critical'
        ? AppColors.critical
        : sev == 'warning'
            ? AppColors.warningColor
            : AppColors.stable;
    final alerts = monitor.alertsFor(patientId);
    final comments = monitor.commentsFor(patientId);
    final isWide = MediaQuery.of(context).size.width > 800;

    return Scaffold(
      backgroundColor: AppColors.surface,
      appBar: AppBar(
        backgroundColor: AppColors.appBarBg,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
        title: Text(
          'OnCallDoc',
          style: GoogleFonts.dmSans(
            fontWeight: FontWeight.w800,
            color: AppColors.primary,
          ),
        ),
        actions: [
          // Sound toggle
          TextButton.icon(
            onPressed: () => monitor.toggleSound(),
            icon: Icon(
              monitor.soundEnabled ? Icons.volume_up : Icons.volume_off,
              size: 18,
              color: monitor.soundEnabled ? AppColors.primary : AppColors.textSecondary,
            ),
            label: Text(
              monitor.soundEnabled ? 'Sound ON' : 'Sound OFF',
              style: GoogleFonts.dmSans(
                fontSize: 12,
                fontWeight: FontWeight.w600,
                color: monitor.soundEnabled ? AppColors.primary : AppColors.textSecondary,
              ),
            ),
          ),
          // Call ward
          Padding(
            padding: const EdgeInsets.only(right: 8),
            child: ElevatedButton.icon(
              onPressed: () => _callWard(patient.dutyPhone),
              icon: const Icon(Icons.phone, size: 16),
              label: const Text('Call Ward'),
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.stable,
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                textStyle: GoogleFonts.dmSans(fontSize: 12, fontWeight: FontWeight.w600),
              ),
            ),
          ),
        ],
      ),
      body: Column(
        children: [
          // Patient header
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            color: AppColors.card,
            child: Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        '${patient.name} · ${patient.gender} · ${patient.age}',
                        style: GoogleFonts.dmSans(
                          color: AppColors.textPrimary,
                          fontSize: 16,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                      Text(
                        '${patient.diagnosis} · ${patient.support} · ${patient.bed} · ${patient.ward}',
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
                    style: GoogleFonts.dmSans(color: sevColor, fontSize: 11, fontWeight: FontWeight.w700),
                  ),
                ),
              ],
            ),
          ),

          // Body
          Expanded(
            child: isWide ? _wideLayout(patient, alerts, comments, monitor) : _narrowLayout(patient, alerts, comments, monitor),
          ),
        ],
      ),
    );
  }

  Widget _wideLayout(patient, List alerts, List comments, MonitorProvider monitor) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Left: camera + vitals
        Expanded(
          flex: 3,
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                _cameraPlaceholder(patient),
                const SizedBox(height: 16),
                _vitalsGrid(patient),
              ],
            ),
          ),
        ),
        // Right: alerts + comments + thresholds
        Expanded(
          flex: 2,
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                AlertLog(alerts: alerts.cast()),
                const SizedBox(height: 12),
                CommentPanel(
                  comments: comments.cast(),
                  onAdd: (text, type) => monitor.addComment(patient.id, text, type),
                ),
                const SizedBox(height: 12),
                ThresholdPanel(
                  patient: patient,
                  onSet: monitor.setThreshold,
                ),
                const SizedBox(height: 80),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _narrowLayout(patient, List alerts, List comments, MonitorProvider monitor) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        children: [
          _cameraPlaceholder(patient),
          const SizedBox(height: 16),
          _vitalsGrid(patient),
          const SizedBox(height: 16),
          AlertLog(alerts: alerts.cast()),
          const SizedBox(height: 12),
          CommentPanel(
            comments: comments.cast(),
            onAdd: (text, type) => monitor.addComment(patient.id, text, type),
          ),
          const SizedBox(height: 12),
          ThresholdPanel(
            patient: patient,
            onSet: monitor.setThreshold,
          ),
          const SizedBox(height: 80),
        ],
      ),
    );
  }

  Widget _cameraPlaceholder(patient) {
    return Container(
      height: 220,
      width: double.infinity,
      decoration: BoxDecoration(
        color: Colors.black87,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Stack(
        children: [
          Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(Icons.videocam, color: Colors.white30, size: 48),
                const SizedBox(height: 8),
                Text(
                  '${patient.ward} Camera · ${patient.bed}',
                  style: GoogleFonts.dmSans(color: Colors.white54, fontSize: 13),
                ),
                Text(
                  'Stream connected · tap to expand',
                  style: GoogleFonts.dmSans(color: Colors.white30, fontSize: 11),
                ),
              ],
            ),
          ),
          Positioned(
            top: 12,
            left: 12,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              decoration: BoxDecoration(
                color: AppColors.critical,
                borderRadius: BorderRadius.circular(6),
              ),
              child: Text(
                'LIVE',
                style: GoogleFonts.dmSans(
                  color: Colors.white,
                  fontSize: 11,
                  fontWeight: FontWeight.w800,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _vitalsGrid(patient) {
    return Builder(builder: (context) => Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Text(
              'LIVE VITALS',
              style: GoogleFonts.dmSans(
                color: AppColors.textSecondary,
                fontSize: 11,
                fontWeight: FontWeight.w700,
                letterSpacing: 1,
              ),
            ),
            const Spacer(),
            GestureDetector(
              onTap: () => Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (_) => VitalTrendsScreen(
                    patientId: patient.id,
                    patientName: patient.name,
                  ),
                ),
              ),
              child: Row(
                children: [
                  Icon(Icons.show_chart, size: 14, color: AppColors.primary),
                  const SizedBox(width: 4),
                  Text(
                    'Trends',
                    style: GoogleFonts.dmSans(
                      color: AppColors.primary,
                      fontSize: 12,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
        const SizedBox(height: 8),
        LayoutBuilder(builder: (context, constraints) {
          final crossCount = constraints.maxWidth > 500 ? 4 : 2;
          return GridView.count(
            crossAxisCount: crossCount,
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            crossAxisSpacing: 10,
            mainAxisSpacing: 10,
            childAspectRatio: 1.1,
            children: [
              VitalCard(
                type: VitalType.hr,
                value: patient.vitals[VitalType.hr] ?? 0,
                threshold: patient.thresholds[VitalType.hr] ?? const VitalThreshold(),
              ),
              VitalCard(
                type: VitalType.spo2,
                value: patient.vitals[VitalType.spo2] ?? 0,
                threshold: patient.thresholds[VitalType.spo2] ?? const VitalThreshold(),
              ),
              VitalCard(
                type: VitalType.rr,
                value: patient.vitals[VitalType.rr] ?? 0,
                threshold: patient.thresholds[VitalType.rr] ?? const VitalThreshold(),
              ),
              BPCard(
                vitals: patient.vitals,
                thresholds: patient.thresholds,
              ),
            ],
          );
        }),
      ],
    ));
  }

  void _callWard(String phone) async {
    final uri = Uri.parse('tel:$phone');
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri);
    }
  }
}
