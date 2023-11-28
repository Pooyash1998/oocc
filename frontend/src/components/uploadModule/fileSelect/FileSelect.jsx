import React, { useState } from 'react';
import './FileSelect.scss';

function FileUpload() {
    const [file, setFile] = useState(null);
    const [isDraggingOver, setDraggingOver] = useState(false);

    const onFileChange = (event) => {
        setFile(event.target.files[0]);
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
        setFile(event.dataTransfer.files[0]);
        setDraggingOver(false); // Reset dragging state when a file is dropped
    };

    return (
        <div
        className={`fileUploadArea ${file ? 'fileSelected' : ''} ${isDraggingOver ? 'draggingOver' : ''}`}
        onDragOver={onDragOver}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
         >
            <span className="areaTxt">Drag and drop your file here, or</span> 
            <label htmlFor="file-upload" className="browseButton">Browse</label>
            <div className="dragDropArea">
                <input id="file-upload" type="file" onChange={onFileChange} hidden />
            </div>
            {file && <p>File selected: {file.name}</p>}
        </div>
    );
}

export default FileUpload;