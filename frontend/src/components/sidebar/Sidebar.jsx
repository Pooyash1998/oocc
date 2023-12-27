import React, { useState } from 'react'
import Drawer from '@mui/material/Drawer'
import ExplicitToggle from './explicitToggle'
import ImplicitToggle from './implicitToggle'


function Sidebar ({ open, onClose, updateBtn,setExpChecked,setImpChecked,impChecked,expChecked}) {
  
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
        <button onClick={updateBtn}>Update Graph</button>
      </section>
    </Drawer>
  )
}

export default Sidebar
