import React, { useEffect, useRef , useState} from 'react';
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

const GraphRenderer = ({ data, expChecked}) => {
  
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const width = '100%';
  const height = '83vh';

  const svgRef = useRef();
  const containerRef = useRef(); // Ref for the container group
  const [zoomState, setZoomState] = useState(d3.zoomIdentity);

  function zoomIn() {
    const newZoomState = zoomState.scale(1.2);
    const [x, y] = d3.zoomTransform(svgRef.current).invert([screenWidth / 2, screenHeight / 2]);
    newZoomState.x = screenWidth / 2 - x * newZoomState.k;
    newZoomState.y = screenHeight / 2 - y * newZoomState.k;
    setZoomState(newZoomState);
    containerRef.current.attr('transform', newZoomState);
  }

  function zoomOut() {
    const newZoomState = zoomState.scale(0.8);
    const [x, y] = d3.zoomTransform(svgRef.current).invert([screenWidth / 2, screenHeight / 2]);
    newZoomState.x = screenWidth / 2 - x * newZoomState.k;
    newZoomState.y = screenHeight / 2 - y * newZoomState.k;
    setZoomState(newZoomState);
    containerRef.current.attr('transform', newZoomState);
  }

  function resetZoom() {
    const newZoomState = d3.zoomIdentity;
    setZoomState(newZoomState);
    containerRef.current.attr('transform', newZoomState);
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
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(screenWidth / 2, screenHeight / 2));

    const color = d3.scaleOrdinal().range(['#468499', 'orange']);

    const links = container.selectAll('line')
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

    // Explicitly set initial transform state with a translation of (0, 0) and scale of 1
    const initialTransform = d3.zoomIdentity.translate(0, 0).scale(1);
    // Calculate actual width and height based on the parent container's size
    const containerWidth = svg.node().parentNode.clientWidth;
    const containerHeight = svg.node().parentNode.clientHeight;
    const zoom = d3.zoom()
      .extent([[0, 0], [containerWidth, containerHeight]])
      .scaleExtent([1, 8])
      .on('zoom', zoomed);
    
    svg.call(zoom).call(zoom.transform, initialTransform); // Apply the initial transform
   
    function zoomed(event) {
      const newTransform = event.transform;
      // Preserve the current scale but adjust the translation
      //newTransform.x = zoomState.x + (event.transform.x - zoomState.x) / zoomState.k;
      //newTransform.y = zoomState.y + (event.transform.y - zoomState.y) / zoomState.k;
      setZoomState(newTransform);
      container.attr('transform', newTransform);
    }

    return () => {
    
    };
  }, [width, data]);

  return (
    <div>
      <svg ref={svgRef}></svg>
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


