import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:jwt_decoder/jwt_decoder.dart';
import '../core/api_client.dart';

class AuthProvider with ChangeNotifier {
  final _storage = const FlutterSecureStorage();
  final ApiClient _api = ApiClient();

  String? _token;
  List<String> _roles = [];

  bool get isAuthenticated => _token != null;
  bool get isAdmin => _roles.contains('ROLE_ADMIN');

  Future<void> initAuth() async {
    _token = await _storage.read(key: 'jwt_token');
    if (_token != null && !JwtDecoder.isExpired(_token!)) {
      _decodeToken();
    } else {
      _token = null;
      await _storage.delete(key: 'jwt_token');
    }
    notifyListeners();
  }

  Future<bool> login(String email, String password) async {
    try {
      final res = await _api.post('/auth/login', {'email': email, 'password': password});
      if (res.statusCode == 200) {
        final data = jsonDecode(res.body);
        _token = data['token'];
        await _storage.write(key: 'jwt_token', value: _token);
        _decodeToken();
        notifyListeners();
        return true;
      }
    } catch (e) {
      print("Login error: $e");
    }
    return false;
  }

  void logout() async {
    _token = null;
    _roles = [];
    await _storage.delete(key: 'jwt_token');
    notifyListeners();
  }

  void _decodeToken() {
    Map<String, dynamic> decodedToken = JwtDecoder.decode(_token!);
    _roles = List<String>.from(decodedToken['roles'] ?? []);
  }
}