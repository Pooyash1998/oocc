import React, { useState } from 'react';
import './Header.scss'; // Importing SCSS for styling
import logoImage from './logo.ico'; // Import your logo image
import Sidebar from '../sidebar'; // Import the Sidebar component

function Header() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="header">
      <span className="menu-icon" onClick={toggleSidebar}>
        &#9776;
      </span>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <span className="header_text">Mirror</span>
      <span className="header_logo">
        <img src={logoImage} alt="Logo" className="logo" />
      </span>
    </div>
  );
}

export default Header;
