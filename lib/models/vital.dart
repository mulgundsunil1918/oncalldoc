enum VitalType { hr, spo2, rr, sbp, dbp, map }

class VitalMeta {
  final String label;
  final String unit;
  final String icon;
  final double min;
  final double max;

  const VitalMeta({
    required this.label,
    required this.unit,
    required this.icon,
    required this.min,
    required this.max,
  });

  static const Map<VitalType, VitalMeta> all = {
    VitalType.hr: VitalMeta(
        label: 'Heart Rate', unit: 'bpm', icon: '♥', min: 20, max: 250),
    VitalType.spo2:
        VitalMeta(label: 'SpO₂', unit: '%', icon: '◉', min: 50, max: 100),
    VitalType.rr: VitalMeta(
        label: 'Resp. Rate', unit: 'br/min', icon: '≈', min: 4, max: 100),
    VitalType.sbp: VitalMeta(
        label: 'BP Systolic', unit: 'mmHg', icon: '↑', min: 30, max: 240),
    VitalType.dbp: VitalMeta(
        label: 'BP Diastolic', unit: 'mmHg', icon: '↓', min: 10, max: 150),
    VitalType.map: VitalMeta(
        label: 'MAP', unit: 'mmHg', icon: '~', min: 20, max: 180),
  };
}

class VitalThreshold {
  final double? warnLow;
  final double? critLow;
  final double? warnHigh;
  final double? critHigh;

  const VitalThreshold({this.warnLow, this.critLow, this.warnHigh, this.critHigh});

  factory VitalThreshold.fromMap(Map<String, dynamic> m) => VitalThreshold(
        warnLow: (m['warnLow'] as num?)?.toDouble(),
        critLow: (m['critLow'] as num?)?.toDouble(),
        warnHigh: (m['warnHigh'] as num?)?.toDouble(),
        critHigh: (m['critHigh'] as num?)?.toDouble(),
      );

  Map<String, dynamic> toMap() => {
        'warnLow': warnLow,
        'critLow': critLow,
        'warnHigh': warnHigh,
        'critHigh': critHigh,
      };

  String severity(double value) {
    if (critLow != null && value < critLow!) return 'critical';
    if (critHigh != null && value > critHigh!) return 'critical';
    if (warnLow != null && value < warnLow!) return 'warning';
    if (warnHigh != null && value > warnHigh!) return 'warning';
    return 'stable';
  }
}

class SimConfig {
  final double base;
  final double range;
  final double maxDrift;

  const SimConfig({
    required this.base,
    required this.range,
    required this.maxDrift,
  });

  factory SimConfig.fromMap(Map<String, dynamic> m) => SimConfig(
        base: (m['base'] as num).toDouble(),
        range: (m['range'] as num).toDouble(),
        maxDrift: (m['maxDrift'] as num).toDouble(),
      );

  Map<String, dynamic> toMap() => {
        'base': base,
        'range': range,
        'maxDrift': maxDrift,
      };
}
