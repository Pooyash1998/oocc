# serializers.py
from rest_framework import serializers
from .models import EventLog
from lxml import etree
from django.conf import settings
import os

class EventLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventLog
        fields = ('id', 'file', 'uploaded_at')

    def validate_file_against_xml(self, value):
        # Construct the path to the XSD schema
        xsd_folder = 'ocelSchema'
        xsd_file_path = os.path.join(settings.BASE_DIR, 'oocc', xsd_folder, 'ocel20-schema-xml.xsd')

        # Parse XSD schema
        schema = etree.XMLSchema(file=xsd_file_path)

        # Parse XML data
        try:
            xml_data = etree.fromstring(value.read())
        except etree.XMLSyntaxError:
            raise serializers.ValidationError('Invalid XML format.')

        # Validate XML against XSD
        is_valid = schema.validate(xml_data)

        if not is_valid:
            raise serializers.ValidationError({'file': 'XML is not valid against XSD.'})

        return value
