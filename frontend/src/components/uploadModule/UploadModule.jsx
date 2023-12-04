import React, { useState } from 'react';
import FileSelect from './fileSelect';
import TextInput from './textInput';
import UploadButton from './uploadButton';
import './UploadModule.scss';

function UploadModule() {
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
        const response = await fetch('http://localhost:8000/upload_ocel_event_logs/', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Upload successful. Result:', result);
        } else {
          console.error('Upload failed.');
        }
      } catch (error) {
        console.error('Error during upload:', error);
      }
      setFile(null); //resetting the fileselection state in FileSelect
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
