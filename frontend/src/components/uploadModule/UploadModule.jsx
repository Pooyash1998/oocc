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

  const handleFileUpload = () => {
    // Perform the upload action using the selected file
    if (file) {
      console.log('Uploading file:', file);
      // Add your upload logic here
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
      {file && <p>File selected: {file.name}</p>}
    </div>
  );
}

export default UploadModule;
