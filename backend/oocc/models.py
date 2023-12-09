# models.py
from django.db import models

class EventLog(models.Model):
    file = models.FileField(upload_to='event_logs/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    processed_data = models.JSONField(blank=True, null=True)  # Store OCPA results here

    def __str__(self):
        return f'EventLog {self.id}'