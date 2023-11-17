from rest_framework import viewsets
from .models import EventLog
from .serializers import EventLogSerializer

class EventLogViewSet(viewsets.ModelViewSet):
    queryset = EventLog.objects.all()
    serializer_class = EventLogSerializer
