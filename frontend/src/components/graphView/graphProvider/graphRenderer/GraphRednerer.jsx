import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import d3Tip from 'd3-tip';

// Initialize the d3-tip library
const tip = d3Tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(d => `Node ID: ${d.id}`); // Update this line

const GraphRenderer = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    d3.select(svgRef.current).selectAll('*').remove();
    if (!data) return;

    const screenWidth = window.innerWidth; // Get the width of the screen
    const width = screenWidth * 0.95; // Set the width to 80% of the screen width
    const height = 600;
    
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background-color', '#f0f0f0')

    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id(d => d.id))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2));

    // Add nodes with styling
    const nodes = svg.selectAll('circle')
      .data(data.nodes)
      .enter().append('circle')
      .attr('r', 10)
      .attr('fill', d => (d.isSource ? 'blue' : 'orange'))
      .call(drag(simulation))
      .on('mouseover', function (event, d) {
        tip.show(d, this);
        d3.select(this).attr('r', 15);
      })
      .on('mouseout', function (event, d) {
        tip.hide(d, this);
        d3.select(this).attr('r', 10);
      });

    // Add links
    const links = svg.selectAll('line')
      .data(data.links)
      .enter().append('line')
      .attr('stroke', '#808080')
      .attr('stroke-width', 3);

    svg.call(tip);

    simulation.nodes(data.nodes)
    .on('tick', () => {
      links
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);
  
      nodes
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
    });

    simulation.force('link')
      .links(data.links);
  }, [data]);

  return (
    <svg ref={svgRef} style={{ border: "2px solid gold" }}></svg>
  );
};

export default GraphRenderer;

function drag(simulation) {
  function dragStarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }

  function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }

  function dragEnded(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }

  return d3.drag()
    .on('start', dragStarted)
    .on('drag', dragged)
    .on('end', dragEnded);
}
