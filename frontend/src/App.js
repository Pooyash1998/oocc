import React, {useState} from 'react'
import HeaderComponent from './components/headerComponent'
import GraphView from './components/graphView'
import Sidebar from './components/sidebar'
import ErrorAlert from './components/errorAlert'

import { createTheme, ThemeProvider } from '@mui/material/styles'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import explicitIcon from './assets/explicit.svg';
import implicitIcon from './assets/implicit.svg';
import notInLogIcon from './assets/notInLog.svg';
import notInO2OIcon from './assets/notInO2O.svg';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif'
    ].join(',')
  }
})
const legendItems = [
  { icon: explicitIcon, description: 'Only Explicit' },
  { icon: implicitIcon, description: 'Only Implicit' },
  { icon: notInLogIcon, description: 'Object not in log (explicit)' },
  { icon: notInO2OIcon, description: 'Object not in o2o (implicit)' },
];
function App () {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fetchGraphData, setfetchGraphData] = useState(null);
  const [error, setError] = useState(null);
  const [expChecked, setExpChecked] = useState(true);
  const [impChecked, setImpChecked] = useState(true);
  const [checkedObjects, setCheckedObjects] = useState({});
  const [UpdateInfo, setUpdateInfo] = useState({
    exp: true,
    imp: true,
    ot_checked : {},
  });

  const updateBtn = () => {
    setUpdateInfo({
      exp: expChecked, 
      imp: impChecked,
      ot_checked : checkedObjects,
    });
  };

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
      <Box sx={{ display: 'flex'}}>
        {/* Sidebar */}
        <Box
          sx={{
            width: sidebarOpen ? 0 : 0, // Adjust width for open/close
            transition: 'width 0.5s ease',
            overflowX: 'hidden',
          }}
        >
          <Sidebar open={sidebarOpen} onClose={toggleSidebar} updateBtn={updateBtn}
           expChecked={expChecked} impChecked={impChecked} setExpChecked={setExpChecked} 
           setImpChecked={setImpChecked} fetchGraphData={fetchGraphData} checkedObjects={checkedObjects}
          setCheckedObjects={setCheckedObjects} triggerError={triggerError}/>
        </Box>

        {/* Main content */}
        <Box sx={{ flexGrow: 1, transition: 'margin 0.3s ease', marginLeft: sidebarOpen ? 38 : 0 }}>
          <Grid container>
            {/* Header */}
            <Grid item xs={12}>
              <HeaderComponent onMenuClick={toggleSidebar} isSidebarOpen={sidebarOpen} setfetchGraphData={setfetchGraphData}
                                triggerError={triggerError}/>
            </Grid>

            {/* GraphView in the center */}
            <Grid item xs={12} sm={12} md={10}>
             <GraphView sidebarOpen={sidebarOpen} GraphData={fetchGraphData} UpdateInfo={UpdateInfo}/>
            </Grid>
             {/* Legend */}
             {fetchGraphData && (
              <Box 
             sx={{position: 'fixed',
                      bottom: 0,
                      right: 0,
                      margin: '10px',
                      padding: '8px',
                      backgroundColor: 'white',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      textAlign: 'center',
                      fontFamily: 'Roboto',
                      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',}}> <strong>Legend</strong> 
                      <div>
                        {legendItems.map((item, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', marginTop: index === 2 ? '20px' : '8px', }}>
                        <img src={item.icon} alt={`icon-${index}`} style={{ width: '35px', height: '35px', marginRight: '5px' }} />
                        <div>{item.description}</div>
                      </div>))}
                      </div>
                      </Box>)}
            {/* Error alert component */}
           <ErrorAlert error={error} onClose={handleErrorClose}/>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
