import {React, useState, useEffect} from 'react'
import Drawer from '@mui/material/Drawer'
import ExplicitToggle from './explicitToggle'
import ImplicitToggle from './implicitToggle'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import  Typography from '@mui/material/Typography'
import PieChart from './pieChart'

function Sidebar ({ open, onClose, updateBtn,setExpChecked,setImpChecked,impChecked,expChecked,fetchGraphData,checkedObjects,setCheckedObjects,triggerError}) {
  
  const [ot_list, setOtList] = useState();
  const [initilizeUpdateInfo,setInitilizeUpdateInfo] = useState(true);
  
  let precision = 0;
  let recall = 0;

  if (fetchGraphData) {
    precision = fetchGraphData.metrics.p;
    recall = fetchGraphData.metrics.r;
  }

  const saveAsSvg = () => {
    const svg = document.getElementsByClassName('svgEl')[0];
  
    if(svg){
      
      // Create a new Blob object containing the SVG data
      const svgBlob = new Blob([new XMLSerializer().serializeToString(svg)], {
        type: 'image/svg+xml'
      });
    
      // Create a link element
      const link = document.createElement('a');
      link.href = URL.createObjectURL(svgBlob);
      link.download = 'graph.svg';
    
      // Trigger a click on the link to start the download
      link.click();
    
      // Clean up
      URL.revokeObjectURL(link.href);
    }
    else
      triggerError("No Graph to save at this moment!");
  };
  
  const saveReport = () => {
    if (fetchGraphData) {
      const { stat, imp_graph_data, exp_graph_data ,metrics} = fetchGraphData;
      // Count nodes and edges for imp_graph_data and exp_graph_data
      const impNodesCount = imp_graph_data.nodes.length;
      const impEdgesCount = imp_graph_data.links.length;
      const expNodesCount = exp_graph_data.nodes.length;
      const expEdgesCount = exp_graph_data.links.length;
  
      // Combine all information into a report string
      const reportContent = `
        Statistics:
        ${stat}
  
        Implicit Graph:
        - Number of Nodes: ${impNodesCount}
        - Number of Edges: ${impEdgesCount}
  
        Explicit Graph:
        - Number of Nodes: ${expNodesCount}
        - Number of Edges: ${expEdgesCount}
  
        Metrics:
        precision : ${metrics.p}
        recall : ${metrics.r}
      `;
  
      // Create a Blob object containing the report data
      const reportBlob = new Blob([reportContent], {
        type: 'text/plain'
      });
  
      // Create a link element
      const link = document.createElement('a');
      link.href = URL.createObjectURL(reportBlob);
      link.download = 'report.txt';
  
      // Trigger a click on the link to start the download
      link.click();
  
      // Clean up
      URL.revokeObjectURL(link.href);
    } else {
      triggerError("No graph data available to generate a report!");
    }
  };

  useEffect(() => {
    if (fetchGraphData) {
      setOtList(fetchGraphData.objectTypes);
    }
  }, [fetchGraphData]);

  // Initialize checkedObjects only when ot_list changes
  useEffect(() => {
    if (ot_list) {
      const initialChecked = {};
      ot_list.forEach((type) => {
        initialChecked[type] = true;
      });
      setCheckedObjects(initialChecked);
    }
  }, [ot_list, setCheckedObjects]);

// This effect will run only once to initializie the updateInfo via updatebtn 
// only when the graphdata is there.
useEffect(() => {
  if (initilizeUpdateInfo && Object.keys(checkedObjects).length > 0) {
    updateBtn();
    setInitilizeUpdateInfo(false);
  }
}, [checkedObjects]); // Empty dependency array means it runs only once

  const handleCheckboxChange = (type) => {
    setCheckedObjects((prevCheckedItems) => ({
      ...prevCheckedItems,
      [type]: !prevCheckedItems[type],
    }));
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        '& .MuiDrawer-paper': {
          backgroundColor: '#e6e6e6',
          width: 300, // Ensure this width matches the width in App.js
          boxSizing: 'border-box'
        }
      }}
    >
      <section className="sidebar" style={{ padding: '10px' }}>
        <ExplicitToggle expChecked={expChecked} setExpChecked={setExpChecked}/>
        <ImplicitToggle impChecked={impChecked} setImpChecked={setImpChecked}/>
        
        {/* Generate checkboxes for each object type */}
        <Typography sx={{ margin: '20px 0', textAlign: 'left', fontWeight: 'bold' }}>
          Filter Object Types:
        </Typography>

        <div sx={{ margin: '10px 0' }}>
          {(ot_list !== undefined && ot_list!== null) ? (
            ot_list.map((type) => (
              <FormControlLabel
                key={type}
                control={
                  <Checkbox
                    checked={checkedObjects[type] || false}
                    onChange={() => handleCheckboxChange(type)}
                    name={type}
                  />
                }
                label={type}
              />
            ))
          ) : (
            <Typography sx={{textAlign:'center', marginTop:'-10px'}}>No object types available!</Typography>
          )}
        </div>

        <Button onClick={updateBtn} variant="contained"
        sx={{
          margin: 'auto',
          display: 'block',
          marginTop: '20px',
          backgroundColor: '#f2f2f2', // Matching AppBar background color
          color: 'black', // Text color
          boxShadow: '1px 3px 5px 3px rgba(0,0,0,0.3)', // Shadow effect
          borderRadius: '10px', // Rounded corners to match AppBar
          '&:hover': {
            backgroundColor: '#e8e8e8', // Slightly darker on hover
            boxShadow: '1px 5px 7px 3px rgba(0,0,0,0.5)' // Enhanced shadow on hover
          }
        }}>Update Graph</Button>

        {/* Divider */}
      <Divider style={{ marginTop: '30px', marginBottom: '10px' }} />

      {/* Export section */}
      <Typography fontWeight="bold">
        Export:
      </Typography>
      
      {/* Save Graph Button */}
      <Button onClick={saveAsSvg} variant="contained" color="primary" 
      style={{ display:'flex' ,marginTop:'10px', marginRight: '10px', width:'120px'}}>
        Save Graph
      </Button>

      {/* Get Report Button */}
      <Button onClick={saveReport} variant="contained" color="primary" 
      style={{ marginTop:'20px',marginRight:'10px', width:'120px'}}>
        Get Report
      </Button>
  
      {/* Metrics */}
      <Typography fontWeight="bold" marginTop='20px'>
        Metrics:
      </Typography>
      <PieChart precision={precision} recall={recall} width={250} height={150} />
      </section>
    </Drawer>
  )
}

export default Sidebar
