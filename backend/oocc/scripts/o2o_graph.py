from ocpa.objects.log.importer.ocel2.sqlite import factory as ocel_sqlite_factory
from ocpa.objects.log.importer.ocel2.xml import factory as ocel_xml_factory
import networkx as nx
import os


ot_list = None
# this function should be called AFTER the get_o2o_Graph()
def get_ot_list() :
    global ot_list
    if (ot_list):
        return ot_list
    else:
        raise ValueError("the list is empty")

def get_o2o_Graph(file_path):
    # Determine the file type based on the file extension
    file_type = get_file_type(file_path)

    if file_type == 'xml':
        ocel = ocel_xml_factory.apply(file_path)
    elif file_type == 'xmlocel':
        ocel = ocel_xml_factory.apply(file_path)    
    elif file_type == 'sqlite':
        ocel = ocel_sqlite_factory.apply(file_path)
    else:
        raise ValueError(f"Unsupported file type: {file_type}")
    
    # Extract object-to-object relationships and create a directed graph(these are explicit)
    graph = ocel.o2o_graph.graph
    # accessing 'ot_objects' which contains the mapping of object types to lists of object identifiers
    ot_objects = ocel.obj.ot_objects
    # Create a new list where each object is mapped to its type
    object_type_mapping = [(obj_id, obj_type) for obj_type, obj_ids in ot_objects.items() for obj_id in obj_ids]
    # store the list of objectTypes 
    global ot_list
    ot_list = ocel.object_types

    return process_graph(graph, object_type_mapping)


def get_file_type(file_path):
    # Extract file extension
    _, file_extension = os.path.splitext(file_path)
    return file_extension[1:]  # Remove the leading dot

def process_graph(graph, object_type_mapping):
    # Create a directed graph
    G = nx.DiGraph()
    # Add nodes and edges to the graph
    for edge in graph.edges(data=True):
        source_node, target_node, attributes = edge
        G.add_edge(source_node, target_node, qualifier=attributes['qualifier'])

    # Add the 'type' property for each node based on object_type_mapping
    for node in G.nodes():
        # Find the corresponding object type for the node
        for obj_id, obj_type in object_type_mapping:
            if node == obj_id:
                # Add the 'type' property to the node
                G.nodes[node]['type'] = obj_type
                break  # No need to continue searching once found
    
    # Convert the graph to a dictionary that can be used in D3.js
    graph_dict = {
        'nodes': [{'id': node, 'type': G.nodes[node]['type'] if 'type' in G.nodes[node] else 'undefined', 'origin': 0 } for node in G.nodes()],
        'links': [{'source': edge[0], 'target': edge[1], 'name': edge[2]['qualifier'], 'origin': 0 } for edge in G.edges(data=True)]
    }


    return graph_dict
