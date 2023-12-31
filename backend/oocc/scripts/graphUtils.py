import random

def merge_graph_data(imp_graph_data, exp_graph_data):
    print("merging")
    
    # Clone the nodes and links to avoid modifying the original data
    imp_nodes = imp_graph_data.get('nodes', [])[:]
    exp_nodes = exp_graph_data.get('nodes', [])[:]
    imp_links = imp_graph_data.get('links', [])[:]
    exp_links = exp_graph_data.get('links', [])[:]
    
    # Iterate over explicit nodes
    for exp_node in exp_nodes:
        # Find the corresponding implicit node by ID
        corresponding_implicit_node = next((imp_node for imp_node in imp_nodes if imp_node['id'] == exp_node['id']), None)
        # If found, update the "origin" property to 2 in both explicit and implicit nodes
        if corresponding_implicit_node:
            exp_node['origin'] = 2
            corresponding_implicit_node['origin'] = 2
    
    # Filter nodes from imp_nodes with origin not equal to 2
    filtered_imp_nodes = [node for node in imp_nodes if node.get('origin', 0) != 2]
    # Combine nodes from exp_nodes and filtered imp_nodes
    combined_nodes = exp_nodes + filtered_imp_nodes
    
    # Update the "origin" property to 2 for edges in both explicit and implicit graphs
    for exp_edge in exp_links:
        corresponding_imp_edge = next((imp_edge for imp_edge in imp_links
                                       if (imp_edge['source'] == exp_edge['source'] and imp_edge['target'] == exp_edge['target']) or
                                          (imp_edge['source'] == exp_edge['target'] and imp_edge['target'] == exp_edge['source'])), None)
        if corresponding_imp_edge:
            corresponding_imp_edge['origin'] = 2
            exp_edge['origin'] = 2
    
    # Copy explicit edges to combined_edges
    combined_edges = exp_links[:]
    # Filter implicit edges with origin 1 and add them to combined_edges
    implicit_edges_with_origin_1 = [imp_edge for imp_edge in imp_links if imp_edge.get('origin', 0) == 1]
    combined_edges += implicit_edges_with_origin_1
    
    # Create a merged graph data object
    merged_graph_data = {
        'nodes': combined_nodes,
        'links': combined_edges,
    }
    
    return merged_graph_data

def get_random_subset(GraphData):
    subset_size = 200

    # Randomly select a subset of edges
    random_links = random.sample(GraphData['links'], min(subset_size, len(GraphData['links'])))

    # Create a set to store unique node IDs
    linked_node_ids = set()

    # Iterate over the selected edges and add source and target IDs to the set
    for link in random_links:
        linked_node_ids.add(link['source'])
        linked_node_ids.add(link['target'])

    # Convert the set to a list of unique node IDs
    random_nodes = list(linked_node_ids)

    rand_graph = {
        'nodes': [node for node in GraphData['nodes'] if node['id'] in linked_node_ids],
        'links': random_links,
    }

    return rand_graph

def calculate_metrics(GraphData):
    '''
    Count true positives, false positives, and false negatives based on "origin" property
    Precision is the ratio of correctly identified implicit relationships (true positives) 
    to the total number of identified implicit relationships.
    Recall is the ratio of correctly identified implicit relationships (true positives) 
    to the total number of actual implicit relationships.
    '''
    true_positives = len([link for link in GraphData['links'] if link['origin'] == 2])
    false_positives = len([link for link in GraphData['links'] if link['origin'] == 1])
    false_negatives = len([link for link in GraphData['links'] if link['origin'] == 0])

    # Calculate precision and recall
    precision = true_positives / (true_positives + false_positives) if (true_positives + false_positives) > 0 else 0
    recall = true_positives / (true_positives + false_negatives) if (true_positives + false_negatives) > 0 else 0

    metrics = {'p': precision, 'r': recall}
    return metrics