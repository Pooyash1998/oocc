import React, { useRef } from 'react';
import './UploadButton.scss';

function UploadButton({ onUpload }) {
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
