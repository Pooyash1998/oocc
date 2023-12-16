from pm4py.algo.transformation.ocel.graphs import object_interaction_graph
import pm4py
import networkx as nx
import os

def get_o2o_Graph(file_path):
    # Determine the file type based on the file extension
    file_type = get_file_type(file_path)

    if file_type == 'jsonocel':
        ocel = pm4py.read_ocel_json(file_path)
    elif file_type == 'xmlocel':
        ocel = pm4py.read_ocel_xml(file_path)
    elif file_type == 'sqlite':
        ocel = pm4py.read_ocel_sqlite(file_path)
    else:
        raise ValueError(f"Unsupported file type: {file_type}")
    
    graph = object_interaction_graph.apply(ocel)
    return process_graph(graph)


def get_file_type(file_path):
    # Extract file extension
    _, file_extension = os.path.splitext(file_path)
    return file_extension[1:]  # Remove the leading dot

def process_graph(graph):
    # Create a directed graph
    G = nx.DiGraph()

    # Add nodes and edges to the graph
    for edge in graph:
        for node in edge:
            G.add_node(node)

    for edge in graph:
        source_node, target_node = edge
        G.add_edge(source_node, target_node)

    # Convert the graph to a dictionary that can be used in D3.js
    graph_dict = {
        'nodes': [{'id': node} for node in G.nodes()],
        'links': [{'source': edge[0], 'target': edge[1]} for edge in G.edges()]
    }

    return graph_dict
