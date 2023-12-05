# views.py
import os
import json
from lxml import etree
import jsonschema
from django.conf import settings

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import EventLog
from .serializers import EventLogSerializer


class EventLogViewSet(viewsets.ModelViewSet):
    queryset = EventLog.objects.all()
    serializer_class = EventLogSerializer

    def validate_xml(self, xml_data, value):
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
            
    def validate_json(self, json_data, json_schema):
        {
            
        }
            
    @action(detail=True, methods=['post'])
    def process_file(self, request, pk=None):
        print(request.data)  # Add this line to print request data
        return Response({'message': 'File processed successfully.'}, status=status.HTTP_200_OK)