# views.py

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import EventLog
from .serializers import EventLogSerializer
from django.http import StreamingHttpResponse
from django.views.decorators.csrf import csrf_exempt

class EventLogViewSet(viewsets.ModelViewSet):
    queryset = EventLog.objects.all()
    serializer_class = EventLogSerializer

    @action(detail=False, methods=['POST'])
    def process_file(self, request, *args, **kwargs):
        # Get the id (pk) from URL parameters
        eventlog_id = kwargs.get('pk')

        if eventlog_id:
            file = request.FILES.get('file')

            if file is None:
                return Response({'error': 'File not provided'}, status=status.HTTP_400_BAD_REQUEST)


            # Implement your file processing logic here
            total_size = file.size
            processed_size = 0

            # Function to generate file chunks and progress
            def file_processing_generator(file):
                nonlocal processed_size
                for chunk in file.chunks():
                    processed_size += len(chunk)
                    progress = int((processed_size / total_size) * 100)
                    yield chunk, progress

            response = StreamingHttpResponse(file_processing_generator(file), content_type='application/octet-stream')
            response['Content-Disposition'] = 'attachment; filename="{0}"'.format(file.name)

            return response
        else:
            return Response({'error': 'File not provided'}, status=status.HTTP_400_BAD_REQUEST)