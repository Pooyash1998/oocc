import React from 'react'
import Button from '@mui/material/Button'

function UploadButton ({ onUpload }) {
  return (
        <Button 
          onClick={ onUpload }
          variant="contained"
          component="span"
          sx={{
            backgroundColor: '#fff',
            color: 'black',
            boxShadow: '1px 3px 5px 3px rgba(0,0,0,0.3)',
            borderRadius: '10px',
            mt: 2,
            '&:hover': {
              backgroundColor: '#e8e8e8',
              boxShadow: '1px 4px 6px 3px rgba(0,0,0,0.5)'
            }
          }}
        >Upload</Button>
  )
}

export default UploadButton
