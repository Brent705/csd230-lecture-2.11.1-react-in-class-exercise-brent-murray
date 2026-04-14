import 'dart:convert';
import 'package:flutter/material.dart';
import '../core/api_client.dart';

class CartProvider with ChangeNotifier {
  final ApiClient _api = ApiClient();

  Map<String, dynamic>? _cart;
  bool _isLoading = false;

  bool get isLoading => _isLoading;
  List<dynamic> get products => _cart?['products'] ?? [];
  int get itemCount => products.length;

  double get total {
    return products.fold(0.0, (sum, item) => sum + (item['price'] ?? 0.0));
  }

  Future<void> fetchCart() async {
    _isLoading = true;
    notifyListeners();
    try {
      final res = await _api.get('/cart');
      if (res.statusCode == 200) {
        _cart = jsonDecode(res.body);
      }
    } catch (e) {
      debugPrint("Error fetching cart: $e");
    }
    _isLoading = false;
    notifyListeners();
  }

  Future<bool> addToCart(int productId) async {
    try {
      final res = await _api.post('/cart/add/$productId', {});
      if (res.statusCode == 200) {
        _cart = jsonDecode(res.body);
        notifyListeners();
        return true;
      }
    } catch (e) {
      debugPrint("Error adding to cart: $e");
    }
    return false;
  }

  Future<void> removeFromCart(int productId) async {
    try {
      final res = await _api.delete('/cart/remove/$productId');
      if (res.statusCode == 200) {
        _cart = jsonDecode(res.body);
        notifyListeners();
      }
    } catch (e) {
      debugPrint("Error removing from cart: $e");
    }
  }

  Future<void> checkout() async {
    // React app loops over cart items and deletes them to simulate checkout
    for (var item in products) {
      await removeFromCart(item['id']);
    }
    notifyListeners();
  }
}