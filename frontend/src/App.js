import React, { useState } from 'react'
import HeaderComponent from './components/headerComponent'
import GraphView from './components/graphView'
import Sidebar from './components/sidebar'
import ErrorAlert from './components/errorAlert'

import { createTheme, ThemeProvider } from '@mui/material/styles'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

const theme = createTheme({
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif'
    ].join(',')
  }
})

function App () {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [updateGraphData, setUpdateGraphData] = useState(null);
  const [error, setError] = useState(null);
  
  const handleErrorClose = () => {
    setError(null);
  };
  const triggerError = (message) => {
    setError(message);
  };
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        {/* Sidebar */}
        <Box
          sx={{
            width: sidebarOpen ? 40 : 0, // Adjust width for open/close
            transition: 'width 0.5s ease',
            overflowX: 'hidden'
          }}
        >
          <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
        </Box>

        {/* Main content */}
        <Box sx={{ flexGrow: 1, transition: 'margin 0.3s ease', marginLeft: sidebarOpen ? 40 : 0 }}>
          <Grid container>
            {/* Header */}
            <Grid item xs={12}>
              <HeaderComponent onMenuClick={toggleSidebar} isSidebarOpen={sidebarOpen} setUpdateGraphData={setUpdateGraphData}
                                triggerError={triggerError}/>
            </Grid>

            {/* GraphView in the center */}
            <Grid item xs={12} sm={12} md={10}>
             <GraphView updateGraphData={updateGraphData}/>
            </Grid>
            {/* Error alert component */}
           <ErrorAlert error={error} onClose={handleErrorClose}/>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
