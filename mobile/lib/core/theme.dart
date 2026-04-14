import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  static const Color bgDark = Color(0xFF0B0C10);
  static const Color cardDark = Color(0xFF0A0710);
  static const Color neonCyan = Color(0xFF00F0FF);
  static const Color neonPink = Color(0xFFFF00A0);
  static const Color neonYellow = Color(0xFFFFEA00);
  static const Color neonGreen = Color(0xFF39FF14);
  static const Color neonPurple = Color(0xFFB026FF);
  static const Color neonOrange = Color(0xFFFF5500);
  static const Color neonTeal = Color(0xFF00FFCC);
  static const Color textLight = Color(0xFFE5E7EB);

  static ThemeData get themeData {
    return ThemeData(
      scaffoldBackgroundColor: bgDark,
      brightness: Brightness.dark,
      textTheme: GoogleFonts.spaceMonoTextTheme().apply(
        bodyColor: textLight,
        displayColor: textLight,
      ),
      colorScheme: const ColorScheme.dark(
        primary: neonCyan,
        secondary: neonPink,
        background: bgDark,
        surface: cardDark,
      ),
    );
  }
}