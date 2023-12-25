import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import d3Tip from 'd3-tip';

const tip = d3Tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  tip.html(d => `Object-ID: ${d.id}<br>Type: ${d.type}`);
  // Apply custom styling
  tip.style('padding', '12px')
    .style('background-color', 'rgba(248, 249, 250, 0.75)') // Background color
    .style('border', '1px solid #dee2e6') // Border
    .style('border-radius', '8px') // Border radius
    .style('box-shadow', '0 0 10px rgba(0, 0, 0, 0.2)') // Box shadow
    .style('color', '#212529'); // Text color
  
const linkTip = d3Tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(d => `${d.name} : ${d.source.id} to ${d.target.id}`);

  linkTip.style('padding', '12px')
  .style('background-color', 'rgba(248, 249, 250, 0.75)')
  .style('border', '1px solid #dee2e6')
  .style('border-radius', '8px')
  .style('box-shadow', '0 0 10px rgba(0, 0, 0, 0.2)')
  .style('color', '#212529');  

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

const GraphRenderer = ({ data }) => {
  const screenWidth = window.innerWidth;
  const width = screenWidth * 0.95;
  const height = 600;

  const svgRef = useRef();
  const zoomRef = useRef(d3.zoom().scaleExtent([0.25, 10]));

  function zoomIn() {
    d3.select(svgRef.current)
      .call(zoomRef.current.scaleBy, 2);
  }
  
  function zoomOut() {
    d3.select(svgRef.current)
      .call(zoomRef.current.scaleBy, 0.5);
  }

  function resetZoom() {
    d3.select(svgRef.current)
      .transition()
      .call(zoomRef.current.scaleTo, 1);
  }

  function center() {
    d3.select(svgRef.current)
      .transition()
      .call(zoomRef.current.translateTo, 0.5 * width, 0.5 * height);
  }

  function panLeft() {
    d3.select(svgRef.current)
      .transition()
      .call(zoomRef.current.translateBy, -50, 0);
  }

  function panRight() {
    d3.select(svgRef.current)
      .transition()
      .call(zoomRef.current.translateBy, 50, 0);
  }

  useEffect(() => {
    function initZoom() {
      d3.select(svgRef.current).call(zoomRef.current);
    }

    // Initialize zoom behavior
    initZoom();

    d3.select(svgRef.current).selectAll('*').remove();
    if (!data) return;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background-color', '#ffffff');

    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id(d => d.id).distance(120))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2));

    const color = d3.scaleOrdinal().range(['#468499', 'orange']);

    const links = svg.selectAll('line')
      .data(data.links)
      .enter().append('line')
      .attr('stroke-width', 3)
      .style('stroke', d => {
        if (d.origin === 1) return '#00ff00';   // Origin 1: Green
        if (d.origin === 1) return 'red';     // Origin 0: Red
        return '#8F8F8F';                    // Origin 2: Default color
      })
      .on('mouseover', function (event, d) {
        linkTip.show(d, this);
        // Additional styling if needed
        d3.select(this).attr('stroke-width', 5);
      })
      .on('mouseout', function (event, d) {
        linkTip.hide(d, this);
        // Reset styling to original width
        d3.select(this).attr('stroke-width', 3);
      });


      const nodes = svg.selectAll('circle')
      .data(data.nodes)
      .enter().append('circle')
      .attr('r', 18)
      .attr('fill','white')
      .attr('stroke', d => color(d.id)) // Set the stroke color based on your data
      .attr('stroke-width', 3)
      .style('stroke-dasharray', d => (d.origin === 1) ? '3,3' : (d.origin === 0) ? '15,10' : 'none') // Dashed stroke for origin 1, Dashed stroke for origin 0
      .call(drag(simulation))
      .on('mouseover', function (event, d) {
        tip.show(d, this);
        d3.select(this).attr('r', 22);
      })
      .on('mouseout', function (event, d) {
        tip.hide(d, this);
        d3.select(this).attr('r', 18);
      });

    svg.call(tip);
    svg.call(linkTip);
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

    return () => {
      svg.on('.zoom', null);
    };
  }, [width, data]);

  return (
    <div>
      <svg ref={svgRef}></svg>
      <button onClick={zoomIn}>Zoom in</button>
      <button onClick={zoomOut}>Zoom out</button>
      <button onClick={resetZoom}>Reset zoom</button>
      <button onClick={panLeft}>Pan left</button>
      <button onClick={panRight}>Pan right</button>
      <button onClick={center}>Center</button>
    </div>
  );
};

export default GraphRenderer;


