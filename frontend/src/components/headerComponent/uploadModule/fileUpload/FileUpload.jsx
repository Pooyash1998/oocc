import React, { useState } from 'react'
import { Paper, Typography, Button } from '@mui/material'

function FileUpload ({ onFileSelect }) {
  const [file, setFile] = useState(null);
  const [isDraggingOver, setDraggingOver] = useState(false);

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setDraggingOver(false); // Reset dragging state when a file is selected
  };

   // Drag and Drop Handlers
  const onDragOver = (event) => {
    event.preventDefault()
  }
  const onDragEnter = () => {
    setDraggingOver(true);
  };

  const onDragLeave = () => {
    setDraggingOver(false);
  };

  const onDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    handleFileSelect(droppedFile);
    onFileSelect(droppedFile); 
  }
  // File input change handler
  const onFileChange = (event) => {
    const selectedFile = event.target.files[0];
    handleFileSelect(selectedFile);
    onFileSelect(selectedFile); // Notify the parent component (UploadModule) about the selected file
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: '10px',
        border: '4px dashed #ccc', 
        textAlign: 'center',
        backgroundColor: '#F0F0F0',
        boxShadow: '1px 3px 5px 3px rgba(0,0,0,0.3)',
        height: 'auto',
        borderColor : isDraggingOver ? '#4a6dfb' : '#707070',
        ...(file
          ? {
              borderColor : '#308830',
            }
          : {}),
      }}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <Typography variant="body1" gutterBottom
      sx={{
        fontSize :'18px',
        fontWeight :'400',
        marginTop : '0.5em',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
        Drag and drop your file here, or
      </Typography>

      <label htmlFor="file-upload"
      sx={{
        display: 'inline',
        justifyContent: 'center',
      }}>
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
      <Typography
        sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            fontSize : '16px',
            fontWeight : '300',
            alignItems:'center',
            color: '#333',
            marginTop : '1em',
            marginBottom : '0.5em',
            fontStyle :'italic',
            textShadow : '0.5px 0.5px 1px rgba(0,0,0,0.5)'
          }}>
          The Supported formats are : xmlocel, xml, sqlite
        </Typography>
      <input id="file-upload" type="file" onChange={onFileChange} hidden />
      {file && <p>File selected: {file.name}</p>}
    </Paper>
  )
}

export default FileUpload
