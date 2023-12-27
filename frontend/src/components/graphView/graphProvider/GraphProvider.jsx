import {React, useEffect, useState} from 'react'
import GraphRenderer from './graphRenderer'

const mergeGraphData = (GraphData) => {
  // Access imp_graph_data and exp_graph_data from Backend GraphData
  const impGraphData = GraphData.imp_graph_data;
  const expGraphData = GraphData.exp_graph_data;
  
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
  return mergedGraphData;
};

const GraphProvider = ({ GraphData, UpdateInfo}) => {
  
  const mergedGraphData = mergeGraphData(GraphData);
  const expFilteredGraphData = {...mergedGraphData};
  const impFilteredGraphData = {...mergedGraphData};
  const allFilteredGraphData = {...mergedGraphData};
  expFilteredGraphData.nodes = expFilteredGraphData.nodes.filter(node => node.origin === 0 || node.origin === 2 );
  expFilteredGraphData.links = expFilteredGraphData.links.filter(link => link.origin === 0 || link.origin === 2 );
  impFilteredGraphData.nodes = impFilteredGraphData.nodes.filter(node => node.origin === 1 || node.origin === 2 );
  impFilteredGraphData.links = impFilteredGraphData.links.filter(link => link.origin === 1 || link.origin === 2 );
  allFilteredGraphData.nodes = allFilteredGraphData.nodes.filter(node => node.origin === 2 );
  allFilteredGraphData.links = allFilteredGraphData.links.filter(link => link.origin === 2 );

  const [finalGraphData, setFinalGraphData] = useState(mergedGraphData);

  const updateGraph = () => {
    if (UpdateInfo.exp && !UpdateInfo.imp) {
      // Only exp is true, filter out nodes and edges with origin !== 0
      return expFilteredGraphData;
    } else if (!UpdateInfo.exp && UpdateInfo.imp) {
      // Only imp is true, filter out nodes and edges with origin !== 1
      return impFilteredGraphData;
    } else if (!UpdateInfo.exp && !UpdateInfo.imp) {
      // both are set to false so show only nodes and edges with origin 2
      return allFilteredGraphData;
    }

    return mergedGraphData;
  };
  const calculateMetrics = () => {
    // Count true positives, false positives, and false negatives based on "origin" property
    /*
    Precision is the ratio of correctly identified implicit relationships (true positives) 
    to the total number of identified implicit relationships.
    Recall is the ratio of correctly identified implicit relationships (true positives) 
    to the total number of actual implicit relationships.

    */
    const truePositives = mergedGraphData.links.filter(link => link.origin === 2).length;
    const falsePositives = mergedGraphData.links.filter(link => link.origin === 1).length;
    const falseNegatives = mergedGraphData.links.filter(link => link.origin === 0).length;

    const precision = truePositives / (truePositives + falsePositives);
    const recall = truePositives / (truePositives + falseNegatives);

    console.log('Precision:', precision);
    console.log('Recall:', recall);
  };
  calculateMetrics();
  // Update the graph data on when updateBtn in sidebar changes
  useEffect(() => {
    setFinalGraphData(updateGraph());
  }, [UpdateInfo.exp, UpdateInfo.imp]);
  
  return (
    <div>
      <GraphRenderer data={finalGraphData}/>
    </div>
  )
}

export default GraphProvider
