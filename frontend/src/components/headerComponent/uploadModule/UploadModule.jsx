import React, {useState} from 'react'
import FileUpload from './fileUpload'
import TextInput from './textInput'

import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import UploadButton from './uploadButton/UploadButton'

function UploadModule ({ closeModal, onUploadSuccess, onProcessSuccess }) {
  const [file, setFile] = useState(null);  // State to keep track of the selected file

  // Function to handle file selection
  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
  }

  // Function to handle file upload
  const handleFileUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      console.log('Uploading file:', file); // Debugging log

      try {
        // Upload the file
        const uploadResponse = await fetch('http://localhost:8000/api/eventlogs/', {
          method: 'POST',
          body: formData,
          // headers: {
          //  'Accept': 'application/json',
          //  'Origin': 'http://localhost:3000',
          // },
        });

        console.log('Upload response:', uploadResponse); // Debugging log

        if (uploadResponse.ok) {
          const result = await uploadResponse.json();
          console.log('Upload successful. Result:', result);

          const processResponse = await fetch(`http://localhost:8000/api/eventlogs/${result.id}/process_file/`, {
            method: 'POST',
          });

          if (processResponse.ok) 
          {
            console.log('Processing successful.');
            const processedData = processResponse.json().processed_data;
            onProcessSuccess(processedData);
          } else {
            console.error('Processing failed.');
          }

          onUploadSuccess(); // Assuming this is a callback
        } else {
          console.error('Upload failed:', await uploadResponse.text());
        }
      } catch (error) {
        console.error('Error during upload:', error);
      }
      setFile(null); // Resetting the file selection
    } else {
      console.log('No file selected');
    }
  };

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
          <FileUpload onFileSelect={handleFileSelect} />
          <TextInput /> {/* Text Input Component */}
          <UploadButton onUpload={handleFileUpload} onClick={closeModal}>
            Upload
          </UploadButton>
        </div>
      </Box>
    </Modal>
  )
}

export default UploadModule
