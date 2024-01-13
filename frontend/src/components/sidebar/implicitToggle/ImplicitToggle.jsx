import React from 'react'
import { Switch, FormControlLabel } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

function ImplicitToggle ({setImpChecked, impChecked}) {
  
  const handleChange = (event) => {
    setImpChecked(event.target.checked)
  }

  return (
    <FormControlLabel
    control={
      <Switch
        checked={impChecked}
        onChange={handleChange}
        icon={<VisibilityOffIcon sx={{ marginTop: '-2px' }} />}
        checkedIcon={<VisibilityIcon sx={{ marginTop: '-2px' }} />}
      />
    }
    label={'Only Implicit Relationships'}
    sx={{
      '& .MuiTypography-root': {
        color: impChecked ? 'black' : 'grey'
      },
      marginLeft: '-15px'
    }}
    />
  )
}

export default ImplicitToggle
