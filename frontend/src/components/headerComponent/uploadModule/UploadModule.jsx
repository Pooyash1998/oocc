import React, {useState} from 'react'
import FileUpload from './fileUpload'

import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import UploadButton from './uploadButton/UploadButton'

function UploadModule ({ closeModal, onUploadSuccess, onProcessSuccess, updateProgress}) {
  const [file, setFile] = useState(null);  // State to keep track of the selected file
   
  // Function to handle file selection
  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
  }

  // Function to handle file upload
  const handleFileUpload = async () => {
    closeModal()

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      console.log('Uploading file:', file); // Debugging log

      try {
        // Upload the file
        const uploadResponse = await fetch('http://localhost:8000/api/eventlogs/', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json',
            'Origin': 'http://localhost:3000',
          },
        });

        console.log('Upload response:', uploadResponse); // Debugging log

        if (uploadResponse.ok) {
          const result = await uploadResponse.json();
          console.log('Upload successful. Result:', result);

          // Handle the progress bar based on the progress information received from the server
          // Call the updateProgress function with the desired progress value
          updateProgress(0);

          const processResponse = await fetch(`http://localhost:8000/api/eventlogs/${result.id}/process_file/`, 
          {
            method: 'POST',
          });

          if (processResponse.ok) 
          {
            // Read chunks and progress updates from the stream
            const reader = processResponse.body.getReader();
            while (true) {
            const { done, value } = await reader.read();
            if (done) {
              console.log('Processing completed.');
              break;
            }
            const [, progress] = JSON.parse(value);
            // Call the updateProgress function with the progress value
            updateProgress(progress);
          }
            console.log('Processing successful.');
            const processedData = processResponse.json().processed_data;
            onProcessSuccess(processedData);
          } else {
            console.error('Processing failed.');
          }

          //onUploadSuccess(); // Assuming this is a callback for parent comp
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
    <div>
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
            width: '40%',
            height: 'auto'
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
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div style={{ position: 'relative',marginTop : '1em' }}>
              <UploadButton onUpload={handleFileUpload} onClick={closeModal}>
                Upload
              </UploadButton></div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default UploadModule
