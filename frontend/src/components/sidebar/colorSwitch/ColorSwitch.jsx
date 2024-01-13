import React from 'react'
import { Switch, FormControlLabel } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

function ColorSwitch ({ColorSwitch, setColorSwitch}) {
  
  const handleChange = (event) => {
    setColorSwitch(event.target.checked)
  }

  return (
    <FormControlLabel
      control={
        <Switch
          checked={ColorSwitch}
          onChange={handleChange}
          icon={<VisibilityOffIcon sx={{ marginTop: '-2px' }} />}
          checkedIcon={<VisibilityIcon sx={{ marginTop: '-2px' }} />}
        />
      }
      label={'Coloring based on Object Type'}
      sx={{
        '& .MuiTypography-root': {
          color: ColorSwitch ? 'black' : 'grey'
        },
        marginLeft: '-15px'
      }}
    />
  )
}

export default ColorSwitch
