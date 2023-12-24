from ocpa.objects.log.importer.ocel2.sqlite import factory as ocel_import_factory
import networkx as nx
import os

def get_o2o_Graph(file_path):
    # Determine the file type based on the file extension
    file_type = get_file_type(file_path)

    if file_type == 'jsonocel':
        ocel = ''
    elif file_type == 'xmlocel':
        ocel = ''
    elif file_type == 'sqlite':
        ocel = ocel_import_factory.apply(file_path)
    else:
        raise ValueError(f"Unsupported file type: {file_type}")
    
    # Extract object-to-object relationships and create a directed graph(these are explicit)
    graph = ocel.o2o_graph.graph
    return process_graph(graph)


def get_file_type(file_path):
    # Extract file extension
    _, file_extension = os.path.splitext(file_path)
    return file_extension[1:]  # Remove the leading dot

def process_graph(graph):
    # Create a directed graph
    G = nx.DiGraph()
    # Add nodes and edges to the graph
    for edge in graph.edges(data=True):
        source_node, target_node, qualifier = edge
        G.add_edge(source_node, target_node, qualifier=qualifier['qualifier'])

    # Convert the graph to a dictionary that can be used in D3.js
    graph_dict = {
        'nodes': [{'id': node, 'name': node} for node in G.nodes()],
        'links': [{'source': edge[0], 'target': edge[1], 'name': edge[2]['qualifier']} for edge in G.edges(data=True)]
    }


    return graph_dict
