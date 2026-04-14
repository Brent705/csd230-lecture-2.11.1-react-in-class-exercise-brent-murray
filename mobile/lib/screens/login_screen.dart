import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';
import '../providers/auth_provider.dart';
import '../core/theme.dart';
import '../widgets/neon_button.dart';

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _emailCtrl = TextEditingController();
  final _passCtrl = TextEditingController();
  bool _isLoading = false;

  void _login() async {
    setState(() => _isLoading = true);
    final success = await context.read<AuthProvider>().login(_emailCtrl.text, _passCtrl.text);
    setState(() => _isLoading = false);

    if (success) {
      context.go('/');
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Access Denied'), backgroundColor: AppTheme.neonPink),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Text(
                "BRENT'S BOOKSTORE",
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 48,
                  fontWeight: FontWeight.w900,
                  fontStyle: FontStyle.italic,
                  color: AppTheme.neonCyan,
                  shadows: [Shadow(color: AppTheme.neonPink, blurRadius: 20)],
                ),
              ),
              const SizedBox(height: 40),
              TextField(
                controller: _emailCtrl,
                decoration: InputDecoration(
                  labelText: 'USERNAME',
                  labelStyle: const TextStyle(color: AppTheme.neonCyan),
                  enabledBorder: const UnderlineInputBorder(borderSide: BorderSide(color: Colors.white24)),
                  focusedBorder: const UnderlineInputBorder(borderSide: BorderSide(color: AppTheme.neonCyan)),
                ),
              ),
              const SizedBox(height: 20),
              TextField(
                controller: _passCtrl,
                obscureText: true,
                decoration: InputDecoration(
                  labelText: 'PASSWORD',
                  labelStyle: const TextStyle(color: AppTheme.neonCyan),
                  enabledBorder: const UnderlineInputBorder(borderSide: BorderSide(color: Colors.white24)),
                  focusedBorder: const UnderlineInputBorder(borderSide: BorderSide(color: AppTheme.neonCyan)),
                ),
              ),
              const SizedBox(height: 40),
              _isLoading
                  ? const Center(child: CircularProgressIndicator(color: AppTheme.neonPink))
                  : NeonButton(
                text: "Login",
                color: AppTheme.neonPink,
                onPressed: _login,
              ),
            ],
          ),
        ),
      ),
    );
  }
}