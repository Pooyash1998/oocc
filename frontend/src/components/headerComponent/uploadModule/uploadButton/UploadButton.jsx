import React, { useRef } from 'react';
import Button from '@mui/material/Button'

function UploadButton ({ onUpload }) {

const fileInputRef = useRef(null);

const handleClick = (e) => {
  e.preventDefault(); // Prevent the default behavior of the button
  // Trigger the file input click only if there are no selected files
    const files = fileInputRef.current.files;
    onUpload(files);
  }
const handleFileChange = (event) => {
  const files = event.target.files;
  // Call the onUpload callback with the selected files
  onUpload(files);
};

  return (

        <Button 
          onClick={ handleClick }
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
        >Upload
        <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        />
        </Button>
  )
}

export default UploadButton
