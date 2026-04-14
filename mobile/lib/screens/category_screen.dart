import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';
import '../core/api_client.dart';
import '../core/form_configs.dart';
import '../core/theme.dart';
import '../providers/auth_provider.dart';
import '../providers/cart_provider.dart';
import '../widgets/product_card.dart';

class CategoryScreen extends StatefulWidget {
  final String title;
  final String endpoint;
  final Color themeColor;
  final IconData icon;
  final List<FormFieldConfig> formConfig;
  final String Function(Map<String, dynamic>) subtitleBuilder;

  const CategoryScreen({
    Key? key,
    required this.title,
    required this.endpoint,
    required this.themeColor,
    required this.icon,
    required this.formConfig,
    required this.subtitleBuilder,
  }) : super(key: key);

  @override
  _CategoryScreenState createState() => _CategoryScreenState();
}

class _CategoryScreenState extends State<CategoryScreen> {
  final ApiClient _api = ApiClient();
  List<dynamic> _items = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _fetchItems();
  }

  Future<void> _fetchItems() async {
    try {
      final res = await _api.get(widget.endpoint);
      if (res.statusCode == 200) {
        setState(() {
          _items = jsonDecode(res.body);
          _isLoading = false;
        });
      }
    } catch (e) {
      setState(() => _isLoading = false);
    }
  }

  Future<void> _deleteItem(int id) async {
    try {
      final res = await _api.delete('${widget.endpoint}/$id');
      if (res.statusCode == 200) {
        _fetchItems();
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Item deleted'), backgroundColor: AppTheme.neonPink));
      }
    } catch (e) {
      debugPrint("Delete failed: $e");
    }
  }

  @override
  Widget build(BuildContext context) {
    final isAdmin = context.watch<AuthProvider>().isAdmin;

    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title, style: TextStyle(color: widget.themeColor, letterSpacing: 2)),
        backgroundColor: Colors.transparent,
        iconTheme: IconThemeData(color: widget.themeColor),
      ),
      body: _isLoading
          ? Center(child: CircularProgressIndicator(color: widget.themeColor))
          : ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: _items.length,
        itemBuilder: (context, index) {
          final item = _items[index];
          String displayTitle = item['title'] ?? item['brand'] ?? 'Unknown Item';

          return ProductCard(
            title: displayTitle,
            subtitle: widget.subtitleBuilder(item),
            price: item['price']?.toDouble() ?? 0.0,
            icon: widget.icon,
            color: widget.themeColor,
            isAdmin: isAdmin,
            onAdd: () async {
              bool success = await context.read<CartProvider>().addToCart(item['id']);
              if (success && context.mounted) {
                ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Added to cart'), backgroundColor: widget.themeColor));
              }
            },
            onDelete: () => _deleteItem(item['id']),
            onEdit: () async {
              // Navigate to form, await result. If true, refresh list.
              final result = await context.push('/admin-form', extra: {
                'title': 'Edit $displayTitle',
                'endpoint': widget.endpoint,
                'config': widget.formConfig,
                'themeColor': widget.themeColor,
                'initialData': item,
              });
              if (result == true) _fetchItems();
            },
          );
        },
      ),
    );
  }
}