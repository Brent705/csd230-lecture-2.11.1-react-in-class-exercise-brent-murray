import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../core/theme.dart';
import 'neon_button.dart';

class ProductCard extends StatelessWidget {
  final String title;
  final String subtitle;
  final double price;
  final IconData icon;
  final Color color;
  final VoidCallback onAdd;
  final bool isAdmin;
  final VoidCallback? onEdit;
  final VoidCallback? onDelete;

  const ProductCard({
    Key? key,
    required this.title,
    required this.subtitle,
    required this.price,
    required this.icon,
    required this.color,
    required this.onAdd,
    this.isAdmin = false,
    this.onEdit,
    this.onDelete,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.cardDark,
        border: Border.all(color: color.withOpacity(0.3)),
        boxShadow: [BoxShadow(color: color.withOpacity(0.05), blurRadius: 10)],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Icon(icon, color: color, size: 28),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white),
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                    const SizedBox(height: 4),
                    Text(subtitle.toUpperCase(), style: TextStyle(color: color, fontSize: 12, letterSpacing: 1.2)),
                  ],
                ),
              ),
              if (isAdmin) ...[
                IconButton(
                  icon: const Icon(LucideIcons.edit2, size: 18, color: AppTheme.neonYellow),
                  onPressed: onEdit,
                ),
                IconButton(
                  icon: const Icon(LucideIcons.trash2, size: 18, color: AppTheme.neonPink),
                  onPressed: onDelete,
                ),
              ]
            ],
          ),
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('\$${price.toStringAsFixed(2)}', style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w900, color: Colors.white)),
              SizedBox(
                width: 120,
                child: NeonButton(text: "Add", color: color, onPressed: onAdd),
              )
            ],
          )
        ],
      ),
    );
  }
}