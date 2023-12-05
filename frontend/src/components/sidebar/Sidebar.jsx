// Sidebar.jsx
import React, { useState, useEffect} from 'react';
import './Sidebar.scss';

function Sidebar({ isOpen, toggleSidebar }) {

  const [isCloseButtonClicked, setCloseButtonClicked] = useState(false);
  
  const handleToggleSidebar = () => {
    setCloseButtonClicked(!isCloseButtonClicked); // Toggle the state for the clicked button
    toggleSidebar();
  };

  // Reset isCloseButtonClicked when the sidebar is opened
  useEffect(() => {
    if (isOpen) {
      setCloseButtonClicked(false);
    }
  }, [isOpen]);
  
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className={`close-button ${isCloseButtonClicked ? 'clicked' : ''}`} 
      onClick={handleToggleSidebar}>
        &#9776;
      </button>
      {/* Other sidebar content */}
    </div>
  );
}

export default Sidebar;