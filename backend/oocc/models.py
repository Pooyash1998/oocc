# models.py
from django.db import models

class OcelEventLog(models.Model):
    timestamp = models.DateTimeField()
    event_type = models.CharField(max_length=255)
    # Add other fields as needed

    def __str__(self):
        return f"{self.timestamp} - {self.event_type}"
