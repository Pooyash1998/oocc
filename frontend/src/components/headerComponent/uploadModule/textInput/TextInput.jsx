import React from 'react'
import { TextField } from '@mui/material'

function TextInput () {
  return (
    <TextField
      fullWidth
      multiline
      rows={25}
      placeholder="Enter your log data..."
      variant="outlined"
      sx={{
        mt: 2,
        borderRadius: '10px',
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'rgba(0,0,0,0.1)'
          },
          '&:hover fieldset': {
            borderColor: 'black'
          },
          '&.Mui-focused fieldset': {
            borderColor: 'black'
          }
        }
      }}
    />
  )
}

export default TextInput
