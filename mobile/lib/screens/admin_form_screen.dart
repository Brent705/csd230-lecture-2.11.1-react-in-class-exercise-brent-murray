import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../core/api_client.dart';
import '../core/form_configs.dart';
import '../core/theme.dart';
import '../widgets/neon_button.dart';

class AdminFormScreen extends StatefulWidget {
  final String title;
  final String endpoint;
  final List<FormFieldConfig> config;
  final Color themeColor;
  final Map<String, dynamic>? initialData;

  const AdminFormScreen({
    Key? key,
    required this.title,
    required this.endpoint,
    required this.config,
    required this.themeColor,
    this.initialData,
  }) : super(key: key);

  @override
  _AdminFormScreenState createState() => _AdminFormScreenState();
}

class _AdminFormScreenState extends State<AdminFormScreen> {
  final _formKey = GlobalKey<FormState>();
  final ApiClient _api = ApiClient();
  final Map<String, dynamic> _formData = {};
  bool _isSaving = false;

  @override
  void initState() {
    super.initState();
    // Initialize form data
    for (var field in widget.config) {
      if (widget.initialData != null && widget.initialData![field.key] != null) {
        _formData[field.key] = widget.initialData![field.key];
      } else {
        _formData[field.key] = field.type == FieldType.boolean ? false : null;
      }
    }
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;
    _formKey.currentState!.save();

    setState(() => _isSaving = true);

    try {
      final isUpdating = widget.initialData != null;
      final url = isUpdating ? '${widget.endpoint}/${widget.initialData!['id']}' : widget.endpoint;

      final res = isUpdating
          ? await _api.put(url, _formData)
          : await _api.post(url, _formData);

      if (res.statusCode == 200 || res.statusCode == 201) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Saved successfully'), backgroundColor: widget.themeColor));
        context.pop(true); // Return true to trigger refresh on previous screen
      } else {
        throw Exception('Failed to save');
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Error saving data'), backgroundColor: AppTheme.neonPink));
    } finally {
      setState(() => _isSaving = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title, style: TextStyle(color: widget.themeColor, letterSpacing: 2)),
        backgroundColor: Colors.transparent,
        iconTheme: IconThemeData(color: widget.themeColor),
      ),
      body: _isSaving
          ? Center(child: CircularProgressIndicator(color: widget.themeColor))
          : SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              ...widget.config.map((field) {
                if (field.type == FieldType.boolean) {
                  return SwitchListTile(
                    title: Text(field.label, style: const TextStyle(fontFamily: 'monospace')),
                    activeColor: widget.themeColor,
                    value: _formData[field.key] ?? false,
                    onChanged: (val) => setState(() => _formData[field.key] = val),
                  );
                }

                return Padding(
                  padding: const EdgeInsets.only(bottom: 20),
                  child: TextFormField(
                    initialValue: _formData[field.key]?.toString() ?? '',
                    keyboardType: field.type == FieldType.number ? const TextInputType.numberWithOptions(decimal: true) : TextInputType.text,
                    decoration: InputDecoration(
                      labelText: field.label,
                      labelStyle: TextStyle(color: widget.themeColor.withOpacity(0.8)),
                      enabledBorder: UnderlineInputBorder(borderSide: BorderSide(color: Colors.white24)),
                      focusedBorder: UnderlineInputBorder(borderSide: BorderSide(color: widget.themeColor)),
                    ),
                    validator: (val) => val == null || val.isEmpty ? 'Required field' : null,
                    onSaved: (val) {
                      if (field.type == FieldType.number) {
                        _formData[field.key] = num.tryParse(val!);
                      } else {
                        _formData[field.key] = val;
                      }
                    },
                  ),
                );
              }).toList(),
              const SizedBox(height: 40),
              SizedBox(
                width: double.infinity,
                child: NeonButton(
                  text: "SAVE RECORD",
                  color: widget.themeColor,
                  onPressed: _submit,
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}