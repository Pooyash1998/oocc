import React from 'react';
import GraphProvider from './graphProvider';

function GraphView({ GraphData, sidebarOpen ,UpdateInfo}) {
  return (
    <section className="graphView" style={{ marginLeft: '20px', marginRight: '0px', marginTop:'0px',
                                       width: sidebarOpen ? window.innerWidth*0.75 : window.innerWidth*0.95,
                                       height: window.innerHeight*0.85}}>
      {GraphData && (
        // Pass the updateGraphData to GraphProvider
        <GraphProvider GraphData={GraphData} UpdateInfo={UpdateInfo}/>
      )}
    </section>
  );
}

export default GraphView;
