import React, { useState } from 'react'
import { Switch, FormControlLabel } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

function ImplicitToggle () {
  const [checked, setChecked] = useState(true)

  const handleChange = (event) => {
    setChecked(event.target.checked)
  }

  return (
    <FormControlLabel
    control={
      <Switch
        checked={checked}
        onChange={handleChange}
        icon={<VisibilityOffIcon sx={{ marginTop: '-2px' }} />}
        checkedIcon={<VisibilityIcon sx={{ marginTop: '-2px' }} />}
      />
    }
    label={checked ? 'Implicit Relationships' : 'Implicit Relationships'}
    sx={{
      '& .MuiTypography-root': {
        color: checked ? 'black' : 'grey'
      },
      marginLeft: '7px'
    }}
    />
  )
}

export default ImplicitToggle
