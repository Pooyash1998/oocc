import React from 'react'

import GraphRenderer from './graphRenderer'

const GraphProvider = ({ updateGraphData }) => {
  // Access imp_graph_data and exp_graph_data from Backend GraphData
  const impGraphData = updateGraphData.imp_graph_data;
  const expGraphData = updateGraphData.exp_graph_data;

  // Iterate over explicit nodes
  expGraphData.nodes.forEach(expNode => {
    // Find the corresponding implicit node by ID
    const correspondingImplicitNode = impGraphData.nodes.find(impNode => impNode.id === expNode.id);
    // If found, update the "origin" property to 2 in both explicit and implicit nodes
    if (correspondingImplicitNode) {
      expNode.origin = 2;
      correspondingImplicitNode.origin = 2;
    }
  });
  // Filter nodes from impGraphData with origin not equal to 2
  const filteredImpNodes = impGraphData.nodes.filter(node => node.origin !== 2);
  // Combine nodes from expGraphData and filtered impGraphData
  const combinedNodes = expGraphData.nodes.concat(filteredImpNodes);

  
  // Update the "origin" property to 2 for edges in both explicit and implicit graphs
  expGraphData.links.forEach(expEdge => {
    const correspondingImpEdge = impGraphData.links.find(impEdge =>
      (impEdge.source === expEdge.source && impEdge.target === expEdge.target) ||
      (impEdge.source === expEdge.target && impEdge.target === expEdge.source)
    );

    if (correspondingImpEdge) {
      correspondingImpEdge.origin = 2; expEdge.origin = 2;
    } 
  });
  // Copy explicit edges to combinedEdges
  const combinedEdges = [...expGraphData.links];
  // Filter implicit edges with origin 1 and add them to combinedEdges
  const implicitEdgesWithOrigin1 = impGraphData.links.filter(impEdge => impEdge.origin === 1);
  combinedEdges.push(...implicitEdgesWithOrigin1);

  //create a merged graph data object
  const mergedGraphData = {
    nodes: combinedNodes,
    links: combinedEdges,
  };

  return (
    <div>
      <GraphRenderer data={mergedGraphData}/>
    </div>
  )
}

export default GraphProvider
