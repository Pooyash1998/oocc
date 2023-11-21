// ImportButton.jsx
import React from 'react';
import './ImportButton.scss'; // Importing SCSS for styling

function ImportButton({ openModal }) {
    return (
        <button className="importButton" onClick={openModal}>
            Import File
        </button>
    );
}

export default ImportButton;
