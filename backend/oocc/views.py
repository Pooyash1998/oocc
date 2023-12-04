# views.py
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import View
from rest_framework import status
from .serializers import OcelEventLogSerializer
from .models import OcelEventLog

class OcelEventLogUploadView(View):
    parser_classes = (FileUploadParser,)

    def post(self, request, *args, **kwargs):
        file_serializer = OcelEventLogSerializer(data=request.data)

        if file_serializer.is_valid():
            # Process the uploaded file using the ocpa library
            # Perform actions on the OCEL event logs

            # Save the event logs to the database
            event_logs = file_serializer.save()
            # You can also perform actions using the OCEL event logs here

            # Serialize the saved logs for response
            serialized_logs = OcelEventLogSerializer(event_logs, many=True)

            return Response(serialized_logs.data, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
