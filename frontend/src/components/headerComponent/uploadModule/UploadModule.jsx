import React from 'react'
import FileUpload from './fileUpload'
import TextInput from './textInput'

import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

function UploadModule ({ closeModal }) {
  return (
    <Modal
      open={true}
      onClose={closeModal}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box
        sx={{
          position: 'relative',
          backgroundColor: '#fff',
          boxShadow: '0px 12px 15px 7px rgba(0,0,0,0.3)',
          borderRadius: '10px',
          p: 4,
          width: '80%',
          maxWidth: '1000px'
        }}
      >
        {/* Close Button */}
        <span
          className="closeButton"
          onClick={closeModal}
          style={{
            cursor: 'pointer',
            position: 'absolute',
            top: '3px',
            right: '10px',
            fontSize: '1.5rem'
          }}
        >
          &times;
        </span>

        {/* Modal Content */}
        <div style={{ position: 'relative' }}>
          <FileUpload /> {/* File Upload Component */}
          <TextInput /> {/* Text Input Component */}
          <Button
            variant="contained"
            component="span"
            onClick={closeModal}
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
          >
            Upload
          </Button>
        </div>
      </Box>
    </Modal>
  )
}

export default UploadModule
