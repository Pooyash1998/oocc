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

   # @action(detail=True, methods=['post'])
    #def process_file(self, request, pk=None):
    #   file = request.data.get('file')
    # Validate the file using the serializer
    #   serializer = OCELSerializer(data=file)
    #    if serializer.is_valid():
    #        # Continue with further processing (to be implemented)
    #        return Response({'message': 'File is valid'}, status=status.HTTP_200_OK)
    #    else:
    #      return Response({'error': 'Invalid file format', 'details': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)