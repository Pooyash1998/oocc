import React, { useRef } from 'react';
import './UploadButton.scss';

function UploadButton({ onUpload }) {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    // Trigger the file input click
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Call the onUpload callback with the selected file
    onUpload(file);
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <button className="uploadButton" onClick={handleClick}>
        Upload
      </button>
    </div>
  );
}

export default UploadButton;