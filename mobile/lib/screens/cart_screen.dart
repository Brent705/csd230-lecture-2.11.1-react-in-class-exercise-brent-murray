import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:go_router/go_router.dart';
import '../providers/cart_provider.dart';
import '../core/theme.dart';
import '../widgets/neon_button.dart';

class CartScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final cartProv = context.watch<CartProvider>();

    return Scaffold(
      appBar: AppBar(
        title: const Text('YOUR CART', style: TextStyle(color: AppTheme.neonCyan)),
        backgroundColor: Colors.transparent,
        iconTheme: const IconThemeData(color: AppTheme.neonCyan),
      ),
      body: cartProv.isLoading
          ? const Center(child: CircularProgressIndicator(color: AppTheme.neonCyan))
          : cartProv.itemCount == 0
          ? Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(LucideIcons.shoppingCart, size: 60, color: Colors.white24),
            const SizedBox(height: 16),
            const Text('CART EMPTY', style: TextStyle(color: AppTheme.neonCyan, fontSize: 24, letterSpacing: 2)),
            const SizedBox(height: 24),
            NeonButton(
              text: "BROWSE STORE",
              color: AppTheme.neonCyan,
              onPressed: () => context.pop(),
            )
          ],
        ),
      )
          : Column(
        children: [
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: cartProv.products.length,
              itemBuilder: (context, index) {
                final item = cartProv.products[index];
                final title = item['title'] ?? item['brand'] ?? 'Unknown Item';
                final price = item['price'] ?? 0.0;

                return Container(
                  margin: const EdgeInsets.only(bottom: 12),
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: AppTheme.cardDark,
                    border: Border.all(color: AppTheme.neonCyan.withOpacity(0.3)),
                  ),
                  child: Row(
                    children: [
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(title, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                            const SizedBox(height: 4),
                            Text('\$${price.toStringAsFixed(2)}', style: const TextStyle(color: AppTheme.neonCyan)),
                          ],
                        ),
                      ),
                      IconButton(
                        icon: const Icon(LucideIcons.trash2, color: AppTheme.neonPink),
                        onPressed: () => cartProv.removeFromCart(item['id']),
                      )
                    ],
                  ),
                );
              },
            ),
          ),
          Container(
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(
              color: AppTheme.cardDark,
              border: const Border(top: BorderSide(color: AppTheme.neonPink)),
              boxShadow: [BoxShadow(color: AppTheme.neonPink.withOpacity(0.1), blurRadius: 20, offset: const Offset(0, -10))],
            ),
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text('TOTAL', style: TextStyle(fontSize: 16, letterSpacing: 2)),
                    Text(
                      '\$${cartProv.total.toStringAsFixed(2)}',
                      style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w900, color: Colors.white, shadows: [Shadow(color: AppTheme.neonCyan, blurRadius: 10)]),
                    ),
                  ],
                ),
                const SizedBox(height: 24),
                SizedBox(
                  width: double.infinity,
                  child: NeonButton(
                    text: "INITIALIZE CHECKOUT",
                    color: AppTheme.neonPink,
                    onPressed: () async {
                      await cartProv.checkout();
                      if (context.mounted) {
                        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Payment Authorized!'), backgroundColor: AppTheme.neonCyan));
                        context.go('/');
                      }
                    },
                  ),
                )
              ],
            ),
          )
        ],
      ),
    );
  }
}