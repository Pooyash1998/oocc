import React from 'react';
import GraphProvider from './graphProvider';

function GraphView({ GraphData, sidebarOpen ,UpdateInfo}) {
  return (
    <section className="graphView" style={{ marginLeft: '0px', marginRight: '0px', marginTop:'0px',
                                       width: sidebarOpen ? '117%' : '117%',
                                       height: '88vh'}}>
      {GraphData && (
        // Pass the updateGraphData to GraphProvider
        <GraphProvider GraphData={GraphData} UpdateInfo={UpdateInfo}/>
      )}
    </section>
  );
}

export default GraphView;
