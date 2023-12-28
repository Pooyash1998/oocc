# views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import EventLog
from .serializers import EventLogSerializer
from django.http import JsonResponse
from oocc.scripts.o2o_graph import get_o2o_Graph
from oocc.scripts.o2o_graph import get_ot_list
from oocc.scripts.o2o_graph import get_insight
from oocc.scripts.implicit_graph import get_implicit_Graph
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
            
            try:
                # Getting the o2o Relationships (explicit)
                exp_graph_data = get_o2o_Graph(event_log.file.path)
                # get the object_event Relationships (implicit)
                imp_graph_data = get_implicit_Graph(event_log.file.path)
                # get the list of object types 
                ot_list = get_ot_list()
                # get some info on the log 
                stat = get_insight()
                # Include the graph data in the JSON response
                response_data = {'message': 'File processed successfully', 'imp_graph_data': imp_graph_data,
                                                                        'exp_graph_data':exp_graph_data,
                                                                        'objectTypes': ot_list,
                                                                        'stat': stat}

                return JsonResponse(response_data, status=200)
            except Exception as e:
                # Log detailed error information
                print(f"Error getting the Graph : {str(e)}")
                return JsonResponse({'error': 'Internal Server Error'}, status=500)
            
            # Process the event log using PM4Py
            #try:   
            #except Exception as e:
            # Log detailed error information
            
        except Exception as e:
            # Log detailed error information
            print(f"Error processing file: {str(e)}")
            return JsonResponse({'error': 'Internal Server Error'}, status=500)