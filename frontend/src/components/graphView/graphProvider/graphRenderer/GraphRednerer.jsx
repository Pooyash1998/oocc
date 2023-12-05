import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const GraphRenderer = ({ data }) => {
  const svgRef = useRef()

  useEffect(() => {
    d3.select(svgRef.current).selectAll('*').remove()

    if (!data) return

    const width = 800
    const height = 600

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)

    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id(d => d.id))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2))

    const links = svg.selectAll('line')
      .data(data.links)
      .enter().append('line')
      .attr('stroke', '#808080')
      .attr('stroke-width', 3)

    const nodes = svg.selectAll('circle')
      .data(data.nodes)
      .enter().append('circle')
      .attr('r', 10)

    simulation.nodes(data.nodes)
      .on('tick', () => {
        links
          .attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y)

        nodes
          .attr('cx', d => d.x)
          .attr('cy', d => d.y)
      })

    simulation.force('link')
      .links(data.links)
  }, [data])

  return (
    <svg ref={svgRef}></svg>
  )
}

export default GraphRenderer
