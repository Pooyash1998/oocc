import React from 'react'

import GraphRenderer from './graphRenderer'

const GraphProvider = ({ updateGraphData }) => {
  
  return (
    <div>
      <GraphRenderer data={updateGraphData}/>
    </div>
  )
}

export default GraphProvider
