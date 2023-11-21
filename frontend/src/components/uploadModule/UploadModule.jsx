import React from 'react';
import FileUpload from './fileUpload'; // Import FileUpload Component
import TextInput from './textInput'; // Import TextInput Component
import './UploadModule.scss';

function UploadModule({ closeModal }) {
    return (
        <div className="uploadModuleOverlay">
            <div className="uploadModule">
                <div className="uploadModuleContent">
                    <span className="closeButton" onClick={closeModal}>&times;</span>
                    <FileUpload /> {/* File Upload Component */}
                    <TextInput /> {/* Text Input Component */}
                    <button className="uploadButton" onClick={closeModal}>Upload</button>
                </div>
            </div>
        </div>
    );
}

export default UploadModule;