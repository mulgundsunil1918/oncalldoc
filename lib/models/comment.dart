class Comment {
  final String id;
  final String patientId;
  final String text;
  final String author;
  final DateTime time;
  final String type; // 'order' | 'note'

  const Comment({
    required this.id,
    required this.patientId,
    required this.text,
    required this.author,
    required this.time,
    required this.type,
  });
}
