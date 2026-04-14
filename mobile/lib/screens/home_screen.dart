import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../providers/auth_provider.dart';
import '../providers/cart_provider.dart';
import '../core/theme.dart';

class HomeScreen extends StatelessWidget {
  final List<Map<String, dynamic>> categories = [
    {'name': 'Books', 'path': '/books', 'icon': LucideIcons.bookOpen, 'color': AppTheme.neonCyan},
    {'name': 'Magazines', 'path': '/magazines', 'icon': LucideIcons.newspaper, 'color': AppTheme.neonPurple},
    {'name': 'Disc Mags', 'path': '/discmags', 'icon': LucideIcons.disc, 'color': AppTheme.neonGreen},
    {'name': 'Gloves', 'path': '/gloves', 'icon': LucideIcons.box, 'color': AppTheme.neonPink},
    {'name': 'Shoes', 'path': '/shoes', 'icon': LucideIcons.footprints, 'color': AppTheme.neonPurple},
    {'name': 'Headgear', 'path': '/headgear', 'icon': LucideIcons.shield, 'color': AppTheme.neonOrange},
    {'name': 'Hand Wraps', 'path': '/handwraps', 'icon': LucideIcons.activity, 'color': AppTheme.neonTeal},
  ];

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: const Text("BRENT'S BOOKSTORE", style: TextStyle(color: AppTheme.neonCyan, fontWeight: FontWeight.bold)),
        actions: [
          Stack(
            alignment: Alignment.center,
            children: [
              IconButton(
                icon: const Icon(Icons.shopping_cart, color: AppTheme.neonCyan),
                onPressed: () => context.push('/cart'),
              ),
              if (context.watch<CartProvider>().itemCount > 0)
                Positioned(
                  right: 8,
                  top: 8,
                  child: CircleAvatar(
                    radius: 8,
                    backgroundColor: AppTheme.neonPink,
                    child: Text(
                      '${context.watch<CartProvider>().itemCount}',
                      style: const TextStyle(fontSize: 10, color: Colors.white, fontWeight: FontWeight.bold),
                    ),
                  ),
                )
            ],
          ),
          IconButton(
            icon: const Icon(LucideIcons.logOut, color: AppTheme.neonPink),
            onPressed: () {
              auth.logout();
              context.go('/login');
            },
          )
        ],
      ),
      body: GridView.builder(
        padding: const EdgeInsets.all(16),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          crossAxisSpacing: 16,
          mainAxisSpacing: 16,
        ),
        itemCount: categories.length,
        itemBuilder: (context, index) {
          final cat = categories[index];
          return GestureDetector(
            onTap: () => context.push(cat['path']),
            child: Container(
              decoration: BoxDecoration(
                color: AppTheme.cardDark,
                border: Border.all(color: cat['color'].withOpacity(0.5)),
                borderRadius: BorderRadius.circular(12),
                boxShadow: [BoxShadow(color: cat['color'].withOpacity(0.1), blurRadius: 10)],
              ),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(cat['icon'], size: 40, color: cat['color']),
                  const SizedBox(height: 12),
                  Text(cat['name'], style: TextStyle(color: cat['color'], fontWeight: FontWeight.bold, letterSpacing: 2)),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}