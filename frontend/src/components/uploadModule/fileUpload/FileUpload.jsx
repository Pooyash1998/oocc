import React, { useState } from 'react';
import './FileUpload.scss';

function FileUpload() {
    const [file, setFile] = useState(null);

    const onFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    // Drag and Drop Handlers
    const onDragOver = (event) => {
        event.preventDefault();
    };

    const onDrop = (event) => {
        event.preventDefault();
        setFile(event.dataTransfer.files[0]);
    };

    return (
        <div className="fileUploadArea" onDragOver={onDragOver} onDrop={onDrop}>
            <div className="dragDropArea">
                Drag and drop your file here, or 
                <label htmlFor="file-upload" className="browseButton">Browse</label>
                <input id="file-upload" type="file" onChange={onFileChange} hidden />
            </div>
            {file && <p>File selected: {file.name}</p>}
        </div>
    );
}

export default FileUpload;