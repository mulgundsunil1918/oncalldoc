import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'providers/monitor_provider.dart';
import 'providers/theme_provider.dart';
import 'screens/monitor/dashboard_screen.dart';
import 'utils/app_theme.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const OnCallDocApp());
}

class OnCallDocApp extends StatelessWidget {
  const OnCallDocApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) {
          final p = MonitorProvider();
          p.init();
          return p;
        }),
        ChangeNotifierProvider(create: (_) {
          final t = ThemeProvider();
          t.load();
          return t;
        }),
      ],
      child: Consumer<ThemeProvider>(
        builder: (context, theme, _) => MaterialApp(
          title: 'OnCallDoc',
          debugShowCheckedModeBanner: false,
          theme: AppTheme.light,
          darkTheme: AppTheme.dark,
          themeMode: theme.mode,
          home: const DashboardScreen(),
        ),
      ),
    );
  }
}
