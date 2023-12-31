import React, { useState } from 'react'
import ImportButton from './importButton'
import UploadModule from './uploadModule'
import ProgressBar from '../progressBar'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

function HeaderComponent ({ onMenuClick, isSidebarOpen, setfetchGraphData, triggerError}) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);

  // Function to pass the updateGraphData function to UploadModule
  const fetchGraphDataFn = (fetchGraphData) => {
    setfetchGraphData(fetchGraphData);
  };
  
  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={8}
      sx={{
        width: '100%',
        boxShadow: '0px 12px 15px -7px rgba(0,0,0,0.3), 0px 0px 10px rgba(0,0,0,0.5)', // Shadow under AppBar and outline
        color: 'black',
        borderRadius: '10px'
      }}
    >
      <Toolbar sx={{
        justifyContent: 'center',
        position: 'relative'
      }}>
        {/* Menu Button */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, position: 'absolute', left: 25 }}
          onClick={onMenuClick}
        >
          {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
        <section
        className="header_importButton" style={{ position: 'absolute', left: 80 }}>
          <ImportButton openModal={openModal} />
          {isModalOpen && <UploadModule closeModal={closeModal} showProgressBar={setShowProgressBar} fetchGraphData={fetchGraphDataFn}
                                        triggerError={triggerError}/>}
        </section>
        {showProgressBar && <ProgressBar showProgressBar={setShowProgressBar} triggerError={triggerError}/>}
        <Typography variant="h3" align="center" color="#333" 
        sx={{
          flexGrow: 1,
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)', // Add a subtle shadow
        }}>
          MIRROR
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default HeaderComponent
