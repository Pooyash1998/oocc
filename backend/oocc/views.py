# views.py

from rest_framework import viewsets
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action

from django.http import HttpResponse  # Import HttpResponse
from .models import EventLog
from .serializers import EventLogSerializer

class EventLogViewSet(viewsets.ModelViewSet):
    queryset = EventLog.objects.all()
    serializer_class = EventLogSerializer
    
    @action(detail=False, methods=['POST'], parser_classes=[FileUploadParser])
    def upload_event_logs(self, request):
        print("Upload method called!")  # Add this line for debugging
        # Get the uploaded file from the request
        uploaded_file = request.FILES.get('file')

        if uploaded_file:
            # Read the first line of the file
            first_line = uploaded_file.readline().decode('utf-8')

            # Log the first line to the console
            print(f"First line of the uploaded file: {first_line}")

            # Return a response indicating success
            return Response({"message": "File uploaded successfully"}, status=status.HTTP_201_CREATED)
        else:
            # Return a response indicating failure
            return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)
