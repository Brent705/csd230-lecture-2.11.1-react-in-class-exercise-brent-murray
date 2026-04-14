import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../core/theme.dart';
import '../providers/auth_provider.dart';
import '../providers/cart_provider.dart';

class ScaffoldWithNavBar extends StatelessWidget {
  final StatefulNavigationShell navigationShell;

  const ScaffoldWithNavBar({Key? key, required this.navigationShell}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final isAdmin = context.watch<AuthProvider>().isAdmin;
    final cartCount = context.watch<CartProvider>().itemCount;

    return Scaffold(
      body: navigationShell,
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          border: const Border(top: BorderSide(color: AppTheme.neonCyan, width: 0.5)),
          boxShadow: [BoxShadow(color: AppTheme.neonCyan.withOpacity(0.1), blurRadius: 10)],
        ),
        child: BottomNavigationBar(
          backgroundColor: AppTheme.bgDark,
          selectedItemColor: AppTheme.neonPink,
          unselectedItemColor: AppTheme.textLight.withOpacity(0.5),
          currentIndex: navigationShell.currentIndex,
          onTap: (index) => navigationShell.goBranch(
            index,
            initialLocation: index == navigationShell.currentIndex,
          ),
          items: [
            const BottomNavigationBarItem(icon: Icon(LucideIcons.home), label: 'Home'),
            BottomNavigationBarItem(
              icon: Stack(
                clipBehavior: Clip.none,
                children: [
                  const Icon(LucideIcons.shoppingCart),
                  if (cartCount > 0)
                    Positioned(
                      right: -5,
                      top: -5,
                      child: CircleAvatar(
                        radius: 8,
                        backgroundColor: AppTheme.neonPink,
                        child: Text('$cartCount', style: const TextStyle(fontSize: 10, color: Colors.white, fontWeight: FontWeight.bold)),
                      ),
                    )
                ],
              ),
              label: 'Cart',
            ),
            if (isAdmin)
              const BottomNavigationBarItem(icon: Icon(LucideIcons.shieldAlert), label: 'Admin'),
          ],
        ),
      ),
    );
  }
}