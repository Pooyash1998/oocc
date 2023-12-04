import React, { useState, useEffect } from 'react'
import GraphRenderer from '../graphRenderer'

const GraphProvider = () => {
  const [graphData, setGraphData] = useState(null)

  // Default graph structure
  const defaultGraph = {
    nodes: [
      { id: 'node1' },
      { id: 'node2' },
      { id: 'node3' }
    ],
    links: [
      { source: 'node1', target: 'node2' },
      { source: 'node2', target: 'node3' }
    ]
  }

  // Fetch graph data from backend
  const fetchGraphData = () => {
    // TODO: Implement backend API call
    // For now, we use the default graph
    setGraphData(defaultGraph)
  }

  useEffect(() => {
    fetchGraphData()
  }, [])

  return (
    <div>
      {graphData
        ? <GraphRenderer data={graphData} />
        : <p>Loading graph...</p>
      }
    </div>
  )
}

export default GraphProvider
