import React from 'react'
import { Switch, FormControlLabel } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

function ExplicitToggle ({expChecked, setExpChecked}) {
  
  const handleChange = (event) => {
    setExpChecked(event.target.checked)
  }

  return (
    <FormControlLabel
      control={
        <Switch
          checked={expChecked}
          onChange={handleChange}
          icon={<VisibilityOffIcon sx={{ marginTop: '-2px' }} />}
          checkedIcon={<VisibilityIcon sx={{ marginTop: '-2px' }} />}
        />
      }
      label={'Only Explicit Relationships'}
      sx={{
        '& .MuiTypography-root': {
          color: expChecked ? 'black' : 'grey'
        },
        marginLeft: '7px'
      }}
    />
  )
}

export default ExplicitToggle
