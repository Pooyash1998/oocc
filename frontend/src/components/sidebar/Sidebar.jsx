import {React, useState, useEffect} from 'react'
import Drawer from '@mui/material/Drawer'
import ExplicitToggle from './explicitToggle'
import ImplicitToggle from './implicitToggle'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { Typography } from '@mui/material'

function Sidebar ({ open, onClose, updateBtn,setExpChecked,setImpChecked,impChecked,expChecked,fetchGraphData,checkedObjects,setCheckedObjects}) {
  
  const [ot_list, setOtList] = useState();
  const [initilizeUpdateInfo,setInitilizeUpdateInfo] = useState(true);

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
      </section>
    </Drawer>
  )
}

export default Sidebar
