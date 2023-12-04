import React from 'react'
import Button from '@mui/material/Button'

function ImportButton ({ openModal }) {
  return (
      <Button
        onClick={openModal}
        variant="contained"
        sx={{
          backgroundColor: '#f2f2f2', // Matching AppBar background color
          color: 'black', // Text color
          boxShadow: '1px 3px 5px 3px rgba(0,0,0,0.3)', // Shadow effect
          borderRadius: '10px', // Rounded corners to match AppBar
          '&:hover': {
            backgroundColor: '#e8e8e8', // Slightly darker on hover
            boxShadow: '1px 5px 7px 3px rgba(0,0,0,0.5)' // Enhanced shadow on hover
          }
        }}
      >
        Import File
      </Button>
  )
}

export default ImportButton
