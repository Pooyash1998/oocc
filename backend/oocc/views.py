# views.py

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import EventLog
from .serializers import EventLogSerializer
from django.http import JsonResponse
##ocpa## 
from ocpa.algo.discovery.ocpn import algorithm as ocpn_discovery_factory
from ocpa.objects.log.importer.ocel import factory as ocel_import_factory
import traceback
#####
import time

class EventLogViewSet(viewsets.ModelViewSet):
    queryset = EventLog.objects.all()
    serializer_class = EventLogSerializer

    @action(detail=False, methods=['POST'])
    def process_file(self, request, *args, **kwargs):
        try:
            # Get the latest uploaded EventLog
            event_log = EventLog.objects.latest('uploaded_at')

            # Check if the file has already been processed
            if event_log.processed_data:
                return JsonResponse({'message': 'File already processed'}, status=200)

            # Process the event log using OCPA
            try:
                print(f"file path is: ********* :{str(event_log.file.path)}")
                ocel = ocel_import_factory.apply(file_path=event_log.file.path)
                
            except Exception as e:
                # Log detailed error information
                print(f"Error importing OCEl file: {str(e)}")
                traceback.print_exc()  # Print the traceback for detailed error information
                return JsonResponse({'error': 'Invalid OCEl file format'}, status=400)

            try:
                ocpn = ocpn_discovery_factory.apply(ocel)
            except Exception as e:
                # Log detailed error information
                print(f"Error applying OCPA algorithm: {str(e)}")
                traceback.print_exc()  # Print the traceback for detailed error information
                return JsonResponse({'error': 'Error applying OCPA algorithm'}, status=500)

            # Store the OCPA results in the database
            event_log.processed_data = {'petri_net': ocpn.to_dict()}
            event_log.save()

            return JsonResponse({'message': 'File processed successfully'}, status=200)

        except EventLog.DoesNotExist:
            return JsonResponse({'error': 'No EventLog found'}, status=404)

        except Exception as e:
            # Log detailed error information
            print(f"Error processing file: {str(e)}")
            traceback.print_exc()  # Print the traceback for detailed error information
            return JsonResponse({'error': 'Internal Server Error'}, status=500)
        