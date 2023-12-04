import React, { useState } from 'react'
import HeaderComponent from './components/headerComponent'
import GraphView from './components/graphView'
import Sidebar from './components/sidebar'

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
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
              <HeaderComponent onMenuClick={toggleSidebar} isSidebarOpen={sidebarOpen} />
            </Grid>

            {/* GraphView in the center */}
            <Grid item xs={12} sm={12} md={10}>
              <GraphView />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
