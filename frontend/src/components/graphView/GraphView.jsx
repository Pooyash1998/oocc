import React from 'react';
import GraphProvider from './graphProvider';

function GraphView({updateGraphData}) {
  return (
    <section className="graphView" >
      {/* Pass the initialGraphData and updateGraphData to GraphProvider */}
      <GraphProvider updateGraphData={updateGraphData}/>
      
    </section>
  );
}

export default GraphView;