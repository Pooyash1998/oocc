# views.py

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import EventLog
from .serializers import EventLogSerializer
#from .serializers import OCELSerializer

class EventLogViewSet(viewsets.ModelViewSet):
    queryset = EventLog.objects.all()
    serializer_class = EventLogSerializer

    @action(detail=True, methods=['post'])
    def process_file(self, request, pk=None):
        print(request.data)  # Add this line to print request data
        return Response({'message': 'File processed successfully.'}, status=status.HTTP_200_OK)