import oocc.scripts.o2o_graph as o2o
import networkx as nx
import itertools
import os

def get_implicit_Graph(file_path):
    ocel = o2o.ocel

    log_df = ocel.log._log.copy()
    log_df["event_objects"] = log_df.apply(lambda x: set([(ot, o) for ot in ocel.object_types for o in x[ot]]),
                                       axis=1)
    OG = nx.Graph()
    OG.add_nodes_from(log_df["event_objects"].explode(
        "event_objects").to_list())
    object_index = list(log_df.columns.values).index("event_objects")
    id_index = list(log_df.columns.values).index("event_id")
    edge_list = []
    # build object graph
    arr = log_df.to_numpy()
    for i in range(0, len(arr)):
        edge_list += [(arr[i][0], *x) for x in itertools.combinations(arr[i][object_index], 2) if x]
    edge_list = [x for x in edge_list if x]
    for edge in edge_list:
        OG.add_edge(edge[1], edge[2], event_id=edge[0])
    return process_graph(OG)
 
def process_graph(graph):
    # Create a directed graph
    G = nx.DiGraph()
    # Add nodes and edges to the graph
    for edge in graph.edges(data=True):
        source_node, target_node, attributes = edge
        G.add_edge(source_node, target_node, event_id=attributes['event_id'])

    # Create D3.js-compatible data
    graph_dict = {
       'nodes': [{'id': node[1], 'type': node[0], 'origin': 1 } for node in G.nodes()],
       'links': [{'source': edge[0][1], 'target': edge[1][1], 'name': edge[2]['event_id'], 'origin': 1 } for edge in G.edges(data=True)]
    }
    return graph_dict