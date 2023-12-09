# serializers.py
from rest_framework import serializers
from .models import EventLog
from lxml import etree
from django.conf import settings
import os

class EventLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventLog
        fields = ('id', 'file', 'uploaded_at', 'processed_data')