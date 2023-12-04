# models.py
from django.db import models

class EventLog(models.Model):
    file = models.FileField(upload_to='event_logs/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

