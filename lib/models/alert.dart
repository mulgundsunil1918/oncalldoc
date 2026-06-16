class Alert {
  final String id;
  final String patientId;
  final String message;
  final String severity; // 'warning' | 'critical'
  final DateTime time;

  const Alert({
    required this.id,
    required this.patientId,
    required this.message,
    required this.severity,
    required this.time,
  });
}
