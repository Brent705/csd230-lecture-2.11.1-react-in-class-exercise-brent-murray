enum FieldType { text, number, boolean, datetime }

class FormFieldConfig {
  final String key;
  final String label;
  final FieldType type;

  const FormFieldConfig({required this.key, required this.label, required this.type});
}

class FormConfigs {
  static const List<FormFieldConfig> book = [
    FormFieldConfig(key: 'title', label: 'Title', type: FieldType.text),
    FormFieldConfig(key: 'author', label: 'Author', type: FieldType.text),
    FormFieldConfig(key: 'price', label: 'Price (\$)', type: FieldType.number),
    FormFieldConfig(key: 'copies', label: 'Copies', type: FieldType.number),
  ];

  static const List<FormFieldConfig> magazine = [
    FormFieldConfig(key: 'title', label: 'Title', type: FieldType.text),
    FormFieldConfig(key: 'price', label: 'Price (\$)', type: FieldType.number),
    FormFieldConfig(key: 'copies', label: 'Copies', type: FieldType.number),
    FormFieldConfig(key: 'orderQty', label: 'Order Qty', type: FieldType.number),
    FormFieldConfig(key: 'currentIssue', label: 'Issue Date (YYYY-MM-DDTHH:mm:ss)', type: FieldType.datetime),
  ];

  static const List<FormFieldConfig> discMag = [
    ...magazine,
    FormFieldConfig(key: 'hasDisc', label: 'Includes Disc', type: FieldType.boolean),
  ];

  static const List<FormFieldConfig> gloves = [
    FormFieldConfig(key: 'brand', label: 'Brand', type: FieldType.text),
    FormFieldConfig(key: 'size', label: 'Size', type: FieldType.text),
    FormFieldConfig(key: 'price', label: 'Price (\$)', type: FieldType.number),
    FormFieldConfig(key: 'weightOz', label: 'Weight (oz)', type: FieldType.number),
  ];

  static const List<FormFieldConfig> shoes = [
    FormFieldConfig(key: 'brand', label: 'Brand', type: FieldType.text),
    FormFieldConfig(key: 'size', label: 'Size', type: FieldType.text),
    FormFieldConfig(key: 'price', label: 'Price (\$)', type: FieldType.number),
    FormFieldConfig(key: 'highTop', label: 'High-Top', type: FieldType.boolean),
  ];

  static const List<FormFieldConfig> headgear = [
    FormFieldConfig(key: 'brand', label: 'Brand', type: FieldType.text),
    FormFieldConfig(key: 'type', label: 'Type', type: FieldType.text),
    FormFieldConfig(key: 'size', label: 'Size', type: FieldType.text),
    FormFieldConfig(key: 'price', label: 'Price (\$)', type: FieldType.number),
  ];

  static const List<FormFieldConfig> handWraps = [
    FormFieldConfig(key: 'brand', label: 'Brand', type: FieldType.text),
    FormFieldConfig(key: 'size', label: 'Length', type: FieldType.text),
    FormFieldConfig(key: 'price', label: 'Price (\$)', type: FieldType.number),
    FormFieldConfig(key: 'elastic', label: 'Mexican Style (Elastic)', type: FieldType.boolean),
  ];
}