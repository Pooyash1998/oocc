import React from 'react'

import GraphRenderer from './graphRenderer'

const GraphProvider = ({ updateGraphData }) => {
  
  /*const graphdata = {
    nodes: [
      { id: 'A' },
      { id: 'B' },
      { id: 'C' },
      { id: 'D' },
      { id: 'E' },
      { id: 'F' }
    ],
    links: [
      { source: 'A', target: 'B' },
      { source: 'B', target: 'D' },
      { source: 'C', target: 'E' },
      { source: 'D', target: 'F' }
    ]
  }
*/
  return (
    <div>
      <GraphRenderer data={updateGraphData}/>
    </div>
  )
}

export default GraphProvider
