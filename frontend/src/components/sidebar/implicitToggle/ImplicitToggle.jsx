import React, { useState } from 'react';
import './ImplicitToggle.scss'; // Import the SCSS file for styling

function ImplicitToggle() {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleEnabled = () => {
    setIsEnabled(!isEnabled);
  };

  return (
    <div className="toggle-container">
      <button className={`implicit-toggle-button ${isEnabled ? 'enabled' : 'disabled'}`} onClick={toggleEnabled}>
        {isEnabled ? 'Implicit Relationships' : 'Implicit Relationships'}
      </button>
    </div>
  );
};

export default ImplicitToggle;