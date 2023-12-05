import React from 'react'
import Drawer from '@mui/material/Drawer'
import ExplicitToggle from './explicitToggle'
import ImplicitToggle from './implicitToggle'
import SearchModule from './searchModule'

function Sidebar ({ open, onClose }) {
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        '& .MuiDrawer-paper': {
          backgroundColor: '#e6e6e6',
          width: 350, // Ensure this width matches the width in App.js
          boxSizing: 'border-box'
        }
      }}
    >
      <section className="sidebar" style={{ padding: '16px' }}>
        <ExplicitToggle />
        <ImplicitToggle />
        <SearchModule />
      </section>
    </Drawer>
  )
}

export default Sidebar
