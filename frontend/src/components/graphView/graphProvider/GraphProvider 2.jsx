import React from 'react'

import GraphRenderer from './graphRenderer'

const GraphProvider = () => {
  const graphData = {
    nodes: [
      { id: 'A' },
      { id: 'B' },
      { id: 'C' }
    ],
    links: [
      { source: 'A', target: 'B' },
      { source: 'B', target: 'C' },
      { source: 'C', target: 'A' }
    ]
  }

  return (
    <div>
      <GraphRenderer data={graphData}/>
    </div>
  )
}

export default GraphProvider
