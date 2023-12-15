import React, {useState} from 'react'
import FileUpload from './fileUpload'

import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import UploadButton from './uploadButton/UploadButton'

function UploadModule ({ closeModal, onUploadSuccess, updateProgress, updateGraphData}) {
  const [file, setFile] = useState(null);  // State to keep track of the selected file
   
  // Function to handle file selection
  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
  }

  // Function to handle file upload
  const handleFileUpload = async () => {
    closeModal();
  
    if (!file) {
      console.log('No file selected');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const xhr = new XMLHttpRequest();
  
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          updateProgress(progress);
        }
      });
  
      xhr.open('POST', 'http://localhost:8000/api/eventlogs/');
      xhr.setRequestHeader('Accept', 'application/json');
  
      xhr.onload = async () => {
        if (xhr.status === 201) {
          try {
            const result = JSON.parse(xhr.responseText);
            console.log('Upload successful. Result:', result);
  
            // Call the onUploadSuccess function if it's defined
            if (onUploadSuccess) {
              onUploadSuccess(result);
            }
  
            // Trigger the process_file function immediately after successful upload
            try {
              const processResponse = await fetch(`http://localhost:8000/api/eventlogs/${result.id}/process_file/`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                
              });
  
              if (processResponse.status === 200) {
                const processResult = await processResponse.json();

                // Update the graph data using the function passed from the parent
                updateGraphData(processResult.graphData);
                console.log('File processing successful:', processResult);
              } else {
                console.error('File processing failed:', processResponse.statusText);
              }
            } catch (processError) {
              console.error('Error during file processing:', processError);
            }
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
        } else {
          console.error('Upload failed:', xhr.responseText);
        }
      };
  
      // Call xhr.send after setting up the onload handler
      xhr.send(formData);
    } catch (error) {
      console.error('Error during upload:', error);
    } finally {
      setFile(null); // Reset the file selection
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
