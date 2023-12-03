# views.py
from django.shortcuts import render, redirect
from .forms import FileUploadForm
from ocpa.objects.log.importer.ocel import factory as ocel_import_factory
from ocpa.algo.discovery.ocpn import algorithm as ocpn_discovery_factory
from ocpa.algo.enhancement.token_replay_based_performance import algorithm as performance_factory
from ocpa.objects.graph.constraint_graph.obj import ConstraintGraph, ActivityNode, ObjectTypeNode, FormulaNode, ControlFlowEdge, ObjectRelationEdge, PerformanceEdge
import ocpa.algo.conformance.constraint_monitoring.algorithm as constraint_monitoring_factory


def process_file(file_path):
    ocel = ocel_import_factory.apply(file_path)
    # Perform processing using OPCA library methods

def upload_file(request):
    if request.method == 'POST':
        form = FileUploadForm(request.POST, request.FILES)
        if form.is_valid():
            uploaded_file = form.save()
            # Call a function to process the uploaded file using OPCA library
            process_file(uploaded_file.file.path)
            return redirect('success_view')
    else:
        form = FileUploadForm()
    return render(request, 'upload_file.html', {'form': form})
