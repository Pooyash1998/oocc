// ImportButton.jsx
import React from 'react'
import './ImportButton.scss'

function ImportButton ({ openModal }) {
  return (
    <button className="importButton" onClick={openModal}>
        Import File
    </button>
  )
}

export default ImportButton
