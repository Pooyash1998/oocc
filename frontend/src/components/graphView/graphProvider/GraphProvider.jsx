import React from 'react'

import GraphRenderer from './graphRenderer'

const GraphProvider = () => {
  const graphData = {
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

  return (
    <div>
      <GraphRenderer data={graphData}/>
    </div>
  )
}

export default GraphProvider
