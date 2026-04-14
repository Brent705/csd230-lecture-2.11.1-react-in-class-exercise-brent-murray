import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../core/theme.dart';
import '../core/form_configs.dart';

class AdminDashboard extends StatelessWidget {
  final List<Map<String, dynamic>> adminActions = [
    {'name': 'Add Book', 'endpoint': '/books', 'config': FormConfigs.book, 'color': AppTheme.neonCyan, 'icon': LucideIcons.bookOpen},
    {'name': 'Add Magazine', 'endpoint': '/magazines', 'config': FormConfigs.magazine, 'color': AppTheme.neonPurple, 'icon': LucideIcons.newspaper},
    {'name': 'Add Disc Mag', 'endpoint': '/discmags', 'config': FormConfigs.discMag, 'color': AppTheme.neonGreen, 'icon': LucideIcons.disc},
    {'name': 'Add Gloves', 'endpoint': '/gloves', 'config': FormConfigs.gloves, 'color': AppTheme.neonPink, 'icon': LucideIcons.box},
    {'name': 'Add Shoes', 'endpoint': '/shoes', 'config': FormConfigs.shoes, 'color': AppTheme.neonPurple, 'icon': LucideIcons.footprints},
    {'name': 'Add Headgear', 'endpoint': '/headgear', 'config': FormConfigs.headgear, 'color': AppTheme.neonOrange, 'icon': LucideIcons.shield},
    {'name': 'Add Wraps', 'endpoint': '/handwraps', 'config': FormConfigs.handWraps, 'color': AppTheme.neonTeal, 'icon': LucideIcons.activity},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('ADMIN CORE', style: TextStyle(color: AppTheme.neonYellow, letterSpacing: 2)),
        backgroundColor: Colors.transparent,
      ),
      body: GridView.builder(
        padding: const EdgeInsets.all(16),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 2, crossAxisSpacing: 16, mainAxisSpacing: 16, childAspectRatio: 1.2
        ),
        itemCount: adminActions.length,
        itemBuilder: (context, index) {
          final action = adminActions[index];
          return GestureDetector(
            onTap: () => context.push('/admin-form', extra: {
              'title': action['name'],
              'endpoint': action['endpoint'],
              'config': action['config'],
              'themeColor': action['color'],
              'initialData': null, // null means Create mode
            }),
            child: Container(
              decoration: BoxDecoration(
                color: AppTheme.cardDark,
                border: Border.all(color: AppTheme.neonYellow.withOpacity(0.5)),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(action['icon'], size: 32, color: AppTheme.neonYellow),
                  const SizedBox(height: 12),
                  Text(action['name'], style: const TextStyle(color: AppTheme.neonYellow, fontWeight: FontWeight.bold)),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}