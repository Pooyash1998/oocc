/* eslint-disable react-hooks/exhaustive-deps */
import {React, useEffect, useState, useRef} from 'react'
import GraphRenderer from './graphRenderer'

const GraphProvider = ({ GraphData, UpdateInfo}) => {
  // Ref to track initial render
  const isInitialRender = useRef(true);
  const mergedGraphData = GraphData.merged;
  const expFilteredGraphData = {...mergedGraphData};
  const impFilteredGraphData = {...mergedGraphData};
  const allFilteredGraphData = {...mergedGraphData};
  expFilteredGraphData.links = expFilteredGraphData.links.filter(link => link.origin === 0 );
  //expFilteredGraphData.nodes = expFilteredGraphData.nodes.filter(node => node.origin === 0 || node.origin === 2 );
  {// now filter the corresponding nodes for the edges in expFilteredGraphData
  const expcorresNodesID = new Set();
    expFilteredGraphData.links.forEach(link => {
      expcorresNodesID.add(link.source.id);
      expcorresNodesID.add(link.target.id);
    }); 
    const expnodearr = Array.from(expcorresNodesID);
    expFilteredGraphData.nodes = expFilteredGraphData.nodes.filter(node => expnodearr.includes(node.id));
  } 
  impFilteredGraphData.links = impFilteredGraphData.links.filter(link => link.origin === 1 );
  //impFilteredGraphData.nodes = impFilteredGraphData.nodes.filter(node => node.origin === 1 || node.origin === 2 );
  {// now filter the corresponding nodes for the edges in impFilteredGraphData
    const impcorresNodesID = new Set();
      impFilteredGraphData.links.forEach(link => {
        impcorresNodesID.add(link.source.id);
        impcorresNodesID.add(link.target.id);
      }); 
      const impnodearr = Array.from(impcorresNodesID);
      impFilteredGraphData.nodes = impFilteredGraphData.nodes.filter(node => impnodearr.includes(node.id));
    } 
  allFilteredGraphData.links = allFilteredGraphData.links.filter(link => link.origin === 2 );
  //allFilteredGraphData.nodes = allFilteredGraphData.nodes.filter(node => node.origin === 2 );
  {// now filter the corresponding nodes for the edges is allFilteredGraphData
    const allcorresNodesID = new Set();
      allFilteredGraphData.links.forEach(link => {
        allcorresNodesID.add(link.source.id);
        allcorresNodesID.add(link.target.id);
      }); 
      const allnodearr = Array.from(allcorresNodesID);
      allFilteredGraphData.nodes = allFilteredGraphData.nodes.filter(node => allnodearr.includes(node.id));
    }
  const [finalGraphData, setFinalGraphData] = useState({...mergedGraphData});
  
  const updateGraph = () => {
        let newGraph
        //Check the Toggles first  
      if (UpdateInfo.exp && !UpdateInfo.imp) {
        // Only exp is true, filter out nodes and edges with origin !== 0
        newGraph = {...expFilteredGraphData};
      } else if (!UpdateInfo.exp && UpdateInfo.imp) {
        // Only imp is true, filter out nodes and edges with origin !== 1
        newGraph = {...impFilteredGraphData};
      } else if (!UpdateInfo.exp && !UpdateInfo.imp) {
        // both are set to false so show only nodes and edges with origin 2
        newGraph = {...allFilteredGraphData};
      } // both set to true 
        else newGraph = {...mergedGraphData};

    //Now checking the Ot checkboxes
    const otCheckedSet = new Set(Object.entries(UpdateInfo.ot_checked)
      .filter(([_, checked]) => checked)
      .map(([type]) => type)
    );
      // Include nodes with undefined type by default
      otCheckedSet.add("undefined");
      otCheckedSet.add("unknown");

      newGraph.nodes = newGraph.nodes.filter((node) => {
      return (otCheckedSet.has(node.type));
    });
    
    newGraph.links = newGraph.links.filter((link) => {
      // Include links with undefined source/target types by default
      const sourceType = link.source.type;
      const targetType = link.target.type;
    return ((otCheckedSet.has(sourceType)) && (otCheckedSet.has(targetType)));
  });
    setFinalGraphData(newGraph);
  };
   
  //Update the graph data on when updateBtn in sidebar changes
  useEffect(() => {
    // Check if it's not the initial render
    if (!isInitialRender.current) {
    updateGraph();
  } else {
    // Update the ref to indicate that the initial render has occurred
    isInitialRender.current = false;
  }
  }, [UpdateInfo.exp, UpdateInfo.imp, UpdateInfo.ot_checked]);
  
  return (
    <div>
      <GraphRenderer data={finalGraphData}/>
    </div>
  )
}

export default GraphProvider
