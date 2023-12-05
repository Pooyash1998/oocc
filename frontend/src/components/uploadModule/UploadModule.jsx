import React, { useState } from 'react';
import FileSelect from './fileSelect';
import TextInput from './textInput';
import UploadButton from './uploadButton';
import './UploadModule.scss';


function UploadModule({ onUploadSuccess ,onProcessSuccess}) {
  const [file, setFile] = useState(null);

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
  };

  const handleFileUpload = async () => {
    // Perform the upload action using the selected file
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

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

        if (uploadResponse.ok) {
          const result = await uploadResponse.json();
          console.log('Upload successful. Result:', result);

          // Trigger processing after successful upload
          const processResponse = await fetch(`http://localhost:8000/api/eventlogs/${result.id}/process_file/`, {
            method: 'POST',
          });

          if (processResponse.ok) {
            console.log('Processing successful.');
            //testing block
            //Ensure that the response contains the processed data
            //const processedData = await processResponse.json();
            //onProcessSuccess(processedData.processed_data);
            } 
            else {
              console.log('Invalid processing response:');
            }

          // Notify the parent component about the success
          onUploadSuccess();
          }

        else {
          console.error('Upload failed.');
        }
      } catch (error) {
        console.error('Error during upload:', error);
      }
      setFile(null); //resetting the file selection state in FileSelect
    } else {
      console.log('No file selected');
    }
  };

  return (
    <div className="uploadModule">
      <div className="uploadModuleContent">
        <FileSelect onFileSelect={handleFileSelect} />
        <TextInput />
      </div>
      <UploadButton onUpload={handleFileUpload} />
    </div>
  );
}

export default UploadModule;
