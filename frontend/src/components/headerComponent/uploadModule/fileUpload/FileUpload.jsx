import React, { useState } from 'react'
import { Paper, Typography, Button } from '@mui/material'

function FileUpload ({ onFileSelect }) {
  const [file, setFile] = useState(null)

  const onFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    onFileSelect(selectedFile)
  }

  const onDragOver = (event) => {
    event.preventDefault()
  }

  const onDrop = (event) => {
    event.preventDefault()
    setFile(event.dataTransfer.files[0])
  }

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: '10px',
        textAlign: 'center',
        backgroundColor: '#fff',
        boxShadow: '1px 3px 5px 3px rgba(0,0,0,0.3)',
        height: '21vh'
      }}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <Typography variant="body1" gutterBottom>
        Drag and drop your file here, or
      </Typography>
      <label htmlFor="file-upload">
        <Button
          variant="contained"
          component="span"
          sx={{
            mt: 1,
            backgroundColor: '#fff',
            color: 'black',
            boxShadow: '1px 3px 5px 3px rgba(0,0,0,0.1)',
            borderRadius: '10px',
            '&:hover': {
              backgroundColor: '#e8e8e8',
              boxShadow: '1px 4px 6px 3px rgba(0,0,0,0.5)'
            }
          }}
        >
          Browse
        </Button>
      </label>
      <input id="file-upload" type="file" onChange={onFileChange} hidden />
      {file && <p>File selected: {file.name}</p>}
    </Paper>
  )
}

export default FileUpload
