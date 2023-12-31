import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';

function ErrorAlert({ error, onClose }) {
  const [isVisible, setIsVisible] = useState(!!error);

  useEffect(() => {
    setIsVisible(!!error);
    
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
      onClose(); // Call the provided onClose function after the timeout
    }, 5000); // Adjust the duration as needed

    return () => clearTimeout(timeoutId);
  }, [error, onClose]);

  return (
    <div style={{ display: isVisible ? 'block' : 'none' }}>
      <Alert
        sx={{
          borderRadius: '10px',
          fontSize: '15pt',
          padding: '10px',
          position: 'fixed',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999,
        }}
        severity="error"
      >
        {error}
      </Alert>
    </div>
  );
}

export default ErrorAlert;
