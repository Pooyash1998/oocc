import React from 'react';
import FileUpload from './fileSelect'; // Import FileUpload Component
import TextInput from './textInput'; // Import TextInput Component
import UploadButton from './uploadButton';
import './UploadModule.scss';

function UploadModule() {
    return (
            <div className="uploadModule">
                <div className="uploadModuleContent">
                    <FileUpload /> {/* File Upload Component */}
                    <TextInput /> {/* Text Input Component */}
                </div>
                <UploadButton/>
            </div>
    );
}

export default UploadModule;