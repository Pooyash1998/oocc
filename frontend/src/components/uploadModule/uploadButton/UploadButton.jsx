import React from 'react';

function UploadButton({ onUpload }) {
    return (
        <button onClick={onUpload}>Upload</button>
    );
}

export default UploadButton;