import React, { useState } from 'react'
import './ExplicitToggle.scss'

function ExplicitToggle () {
  const [isEnabled, setIsEnabled] = useState(true)
  const toggleEnabled = () => {
    setIsEnabled(!isEnabled)
  }

  return (
    <div className="toggle-container">
      <button className={`explicit-toggle-button ${isEnabled ? 'enabled' : 'disabled'}`} onClick={toggleEnabled}>
        {isEnabled ? 'Explicit Relationships' : 'Explicit Relationships'}
      </button>
    </div>
  )
}

export default ExplicitToggle
