import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'dart:io' show Platform;

class ApiClient {
  static String get baseUrl {
    if (Platform.isAndroid) return 'http://10.0.2.2:8080/api/rest';
    return 'http://localhost:8080/api/rest';
  }

  final _storage = const FlutterSecureStorage();

  Future<Map<String, String>> _getHeaders() async {
    String? token = await _storage.read(key: 'jwt_token');
    return {
      'Content-Type': 'application/json',
      if (token != null) 'Authorization': 'Bearer $token',
    };
  }

  Future<http.Response> get(String endpoint) async {
    return await http.get(Uri.parse('$baseUrl$endpoint'), headers: await _getHeaders());
  }

  Future<http.Response> post(String endpoint, Map<String, dynamic> body) async {
    return await http.post(
      Uri.parse('$baseUrl$endpoint'),
      headers: await _getHeaders(),
      body: jsonEncode(body),
    );
  }

  // ADDED: Put method for updating existing items
  Future<http.Response> put(String endpoint, Map<String, dynamic> body) async {
    return await http.put(
      Uri.parse('$baseUrl$endpoint'),
      headers: await _getHeaders(),
      body: jsonEncode(body),
    );
  }

  Future<http.Response> delete(String endpoint) async {
    return await http.delete(Uri.parse('$baseUrl$endpoint'), headers: await _getHeaders());
  }
}