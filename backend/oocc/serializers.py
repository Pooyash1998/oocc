# serializers.py
from rest_framework import serializers
from .models import OcelEventLog

class OcelEventLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = OcelEventLog
        fields = '__all__'
