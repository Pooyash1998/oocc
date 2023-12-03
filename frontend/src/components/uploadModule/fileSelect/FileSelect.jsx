import React, { useState } from 'react';
import './FileSelect.scss';

function FileSelect({ onFileSelect }) {
  const [file, setFile] = useState(null);
  const [isDraggingOver, setDraggingOver] = useState(false);

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setDraggingOver(false); // Reset dragging state when a file is selected
  };

  // Drag and Drop Handlers
  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDragEnter = () => {
    setDraggingOver(true);
  };

  const onDragLeave = () => {
    setDraggingOver(false);
  };

  const onDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    handleFileSelect(droppedFile);
  };

  return (
    <div
      className={`fileUploadArea ${file ? 'fileSelected' : ''} ${
        isDraggingOver ? 'draggingOver' : ''
      }`}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <span className="areaTxt">Drag and drop your file here, or</span>
      <label htmlFor="file-upload" className="browseButton">
        Browse
      </label>
      <div className="dragDropArea">
        <input id="file-upload" type="file" onChange={(e) => onFileSelect(e.target.files[0])} hidden />
      </div>
      {file && <p>File selected: {file.name}</p>}
    </div>
  );
}

export default FileSelect;