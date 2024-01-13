/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import d3Tip from 'd3-tip';
import { Button } from '@mui/material';
// Import SVG files
import ZoomInIcon from '../../../../assets/zoom-in.svg';
import ZoomOutIcon from '../../../../assets/zoom-out.svg';
import ResetZoomIcon from '../../../../assets/zoom-reset.svg';

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
    function dragStarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.1).restart();
      d.fx = d.x;
      d.fy = d.y;
      simulation.force('charge').strength(0); // Change the strength as needed
    }
  
    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }
  
    function dragEnded(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
      simulation.force('charge').strength(-15); // Reset the strength
    }
  
    return d3.drag()
      .on('start', (event, d) => dragStarted(event, d))
      .on('drag', (event, d) => dragged(event, d))
      .on('end', (event, d) => dragEnded(event, d));
  }

const GraphRenderer = ({ data, expChecked}) => {
  
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const width = '100%';
  const height = '83vh';

  const svgRef = useRef();
  const containerRef = useRef(); // Ref for the container group
  const zoomStateRef = useRef(d3.zoomIdentity);

  function zoomIn() {
    d3.select(svgRef.current).call(zoom.scaleBy, 1.2);
  }

  function zoomOut() {
    d3.select(svgRef.current).call(zoom.scaleBy, 0.8);
  }

  function resetZoom() {
    d3.select(svgRef.current).call(zoom.transform, d3.zoomIdentity);
  }

  const zoom = d3.zoom()
    .extent([[0, 0], [screenWidth, screenHeight]])
    .scaleExtent([0.1, 8])
    .on('zoom', zoomed);

  function zoomed(event) {
    zoomStateRef.current = event.transform;
    containerRef.current.attr('transform', event.transform);
  }

  useEffect(() => {

    d3.select(svgRef.current).selectAll('*').remove();
    if (!data) return;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background-color', '#ffffff');
     // Create a container group for nodes and links
    const container = svg.append('g');
    containerRef.current = container; // Save the container reference

    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id(d => d.id).distance(120))
      .force('charge', d3.forceManyBody().strength(-15))
      .force('center', d3.forceCenter(screenWidth / 2, screenHeight / 2));

    //const color = d3.scaleOrdinal().range(['#468499', 'orange']);
    const color = d3.scaleOrdinal().range(['#3498db', '#2980b9', '#0077cc', '#006699', '#005580']);
    const links = container.selectAll('line')
      .data(data.links)
      .enter().append('line')
      .attr('stroke-width', 3)
      .style('stroke', d => {
        if (d.origin === 1) return '#00ff00';   // Origin 1: Green
        if (d.origin === 0) return 'red';     // Origin 0: Red
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


      const nodes = container.selectAll('circle')
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

      svg.call(zoom);
    return () => {
    
    };
  }, [width, data, screenWidth, screenHeight]);
    
 
  
  

  return (
    <div>
      <svg className='svgEl' ref={svgRef}></svg>
      <Button onClick={zoomIn} sx={{padding:'0px', marginLeft:'0'}}> 
        <img src={ZoomInIcon} alt="Zoom In" style={{ width: '30px', height: '30px' }} />
      </Button>
      <Button onClick={zoomOut} sx={{padding:'0px', marginLeft:'0'}}>
      <img src={ZoomOutIcon} alt="Zoom Out" style={{ width: '30px', height: '30px' }} />
      </Button>
      <Button onClick={resetZoom} sx={{padding:'0px', marginLeft:'0'}}>
      <img src={ResetZoomIcon} alt="Reset Zoom" style={{ width: '30px', height: '30px' }} />
      </Button>
    </div>
  );
};

export default GraphRenderer;


