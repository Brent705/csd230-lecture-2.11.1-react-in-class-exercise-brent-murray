import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons/lucide_icons.dart';

import 'core/theme.dart';
import 'core/form_configs.dart';
import 'providers/auth_provider.dart';
import 'providers/cart_provider.dart';

import 'widgets/scaffold_with_nav.dart';
import 'screens/login_screen.dart';
import 'screens/home_screen.dart';
import 'screens/cart_screen.dart';
import 'screens/category_screen.dart';
import 'screens/admin_dashboard.dart';
import 'screens/admin_form_screen.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => CartProvider()),
      ],
      child: MyApp(),
    ),
  );
}

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  late final GoRouter _router;

  @override
  void initState() {
    super.initState();
    final auth = context.read<AuthProvider>();

    _router = GoRouter(
      initialLocation: '/',
      redirect: (context, state) {
        final isLoggedIn = auth.isAuthenticated;
        final isLoggingIn = state.matchedLocation == '/login';

        if (!isLoggedIn && !isLoggingIn) return '/login';
        if (isLoggedIn && isLoggingIn) return '/';
        return null;
      },
      routes: [
        GoRoute(
          path: '/login',
          builder: (context, state) => LoginScreen(),
        ),

        // --- BOTTOM NAVIGATION SHELL ---
        StatefulShellRoute.indexedStack(
          builder: (context, state, navigationShell) {
            return ScaffoldWithNavBar(navigationShell: navigationShell);
          },
          branches: [
            // Branch 0: Home
            StatefulShellBranch(
              routes: [
                GoRoute(
                  path: '/',
                  builder: (context, state) {
                    context.read<CartProvider>().fetchCart();
                    return HomeScreen();
                  },
                ),
              ],
            ),
            // Branch 1: Cart
            StatefulShellBranch(
              routes: [
                GoRoute(
                  path: '/cart',
                  builder: (context, state) => CartScreen(),
                ),
              ],
            ),
            // Branch 2: Admin Dashboard
            StatefulShellBranch(
              routes: [
                GoRoute(
                  path: '/admin',
                  builder: (context, state) => AdminDashboard(),
                ),
              ],
            ),
          ],
        ),

        // --- SUB-ROUTES (Pushed on top of the shell) ---
        GoRoute(
          path: '/admin-form',
          builder: (context, state) {
            final extras = state.extra as Map<String, dynamic>;
            return AdminFormScreen(
              title: extras['title'],
              endpoint: extras['endpoint'],
              config: extras['config'],
              themeColor: extras['themeColor'],
              initialData: extras['initialData'],
            );
          },
        ),
        GoRoute(
          path: '/books',
          builder: (context, state) => CategoryScreen(
            title: 'BOOKS',
            endpoint: '/books',
            themeColor: AppTheme.neonCyan,
            icon: LucideIcons.bookOpen,
            formConfig: FormConfigs.book,
            subtitleBuilder: (item) => item['author'] ?? 'Unknown Author',
          ),
        ),
        GoRoute(
          path: '/magazines',
          builder: (context, state) => CategoryScreen(
            title: 'MAGAZINES',
            endpoint: '/magazines',
            themeColor: AppTheme.neonPurple,
            icon: LucideIcons.newspaper,
            formConfig: FormConfigs.magazine,
            subtitleBuilder: (item) => 'Issue: ${item['currentIssue']?.substring(0, 10) ?? 'N/A'} | Stock: ${item['orderQty'] ?? 0}',
          ),
        ),
        GoRoute(
          path: '/discmags',
          builder: (context, state) => CategoryScreen(
            title: 'DISC MAGS',
            endpoint: '/discmags',
            themeColor: AppTheme.neonGreen,
            icon: LucideIcons.disc,
            formConfig: FormConfigs.discMag,
            subtitleBuilder: (item) => 'Issue: ${item['currentIssue']?.substring(0, 10) ?? 'N/A'} | Has Disc: ${item['hasDisc'] == true ? 'YES' : 'NO'}',
          ),
        ),
        GoRoute(
          path: '/gloves',
          builder: (context, state) => CategoryScreen(
            title: 'BOXING GLOVES',
            endpoint: '/gloves',
            themeColor: AppTheme.neonPink,
            icon: LucideIcons.box,
            formConfig: FormConfigs.gloves,
            subtitleBuilder: (item) => 'Size: ${item['size'] ?? 'N/A'} | Weight: ${item['weightOz'] ?? 0}oz',
          ),
        ),
        GoRoute(
          path: '/shoes',
          builder: (context, state) => CategoryScreen(
            title: 'BOXING SHOES',
            endpoint: '/shoes',
            themeColor: AppTheme.neonPurple,
            icon: LucideIcons.footprints,
            formConfig: FormConfigs.shoes,
            subtitleBuilder: (item) => 'Size: ${item['size'] ?? 'N/A'} | Style: ${item['highTop'] == true ? 'High-Top' : 'Low-Top'}',
          ),
        ),
        GoRoute(
          path: '/headgear',
          builder: (context, state) => CategoryScreen(
            title: 'HEADGEAR',
            endpoint: '/headgear',
            themeColor: AppTheme.neonOrange,
            icon: LucideIcons.shield,
            formConfig: FormConfigs.headgear,
            subtitleBuilder: (item) => 'Size: ${item['size'] ?? 'N/A'} | Type: ${item['type'] ?? 'Standard'}',
          ),
        ),
        GoRoute(
          path: '/handwraps',
          builder: (context, state) => CategoryScreen(
            title: 'HAND WRAPS',
            endpoint: '/handwraps',
            themeColor: AppTheme.neonTeal,
            icon: LucideIcons.activity,
            formConfig: FormConfigs.handWraps,
            subtitleBuilder: (item) => 'Length: ${item['size'] ?? 'N/A'} | Stretch: ${item['elastic'] == true ? 'Mexican' : 'Traditional'}',
          ),
        ),
      ],
      refreshListenable: auth,
    );

    auth.initAuth();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'Brent\'s Bookstore Mobile',
      theme: AppTheme.themeData,
      routerConfig: _router,
      debugShowCheckedModeBanner: false,
    );
  }
}