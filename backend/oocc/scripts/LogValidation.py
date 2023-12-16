import pm4py
import os

xmlschema_path = os.path.join(os.path.dirname(__file__), 'ocelSchema', 'schema.xml')
jsonschema_path = os.path.join(os.path.dirname(__file__), 'ocelSchema', 'schema.json')

def validate_file(file_path):
    # Validate against OCEL XML Schema
    def validate_xml(file_path):
        try:
            pm4py.objects.ocel.validation.xmlocel.apply(file_path, xmlschema_path)
            return True
        except Exception as e:
            print(f"XML validation error: {str(e)}")
            return False

    # Validate against OCEL JSON Schema
    def validate_json(file_path):
        try:
            pm4py.objects.ocel.validation.jsonocel.apply(file_path, jsonschema_path)
            return True
        except Exception as e:
            print(f"JSON validation error: {str(e)}")
            return False

    # Determine file type and perform validation
    if file_path.endswith('.xmlocel'):
        return validate_xml(file_path)
    elif file_path.endswith('.jsonocel'):
        return validate_json(file_path)
    elif file_path.endswith('.sqlite'):
        # Add additional SQLite validation logic if needed
        return True
    else:
        print("Unsupported file type for validation")
        return False
