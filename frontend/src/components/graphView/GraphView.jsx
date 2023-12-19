import React from 'react';
import GraphProvider from './graphProvider';

function GraphView({ updateGraphData }) {
  return (
    <section className="graphView" style={{
      marginLeft: '20px', marginRight: '0px'
      }}>
      {/* Pass the initialGraphData and updateGraphData to GraphProvider */}
      <GraphProvider updateGraphData={updateGraphData} />
    </section>
  );
}

export default GraphView;
