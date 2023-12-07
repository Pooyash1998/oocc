import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, LinearProgress, Alert } from '@mui/material';

function ProgressBar({ progressValue }) {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    let timeout;
    if (progressValue >= 0 && progressValue <= 100) {
      setProgress(progressValue);
      setError(false);

      if (progressValue < 100) {
        timeout = setTimeout(() => {
          setError(true);
          setProgress(0);
        }, 10000);
      }
    }

    // Open the dialog when progress starts
    setOpen(true);

    return () => clearTimeout(timeout);
  }, [progressValue]);

  const handleClose = () => {
    // Close the dialog when progress reaches 100%
    setOpen(false);
  };

  if (error) {
    return (
      <Alert severity="error">An error occurred. Please try again.</Alert>
    );
  }

  const dialogContentStyle = {
    width: '80%', // Adjust the width as needed
    minWidth: '300px', // Minimum width to prevent it from becoming too narrow
  };

  const progressBarStyle = {
    height: '30px', // Adjust the height to make the progress bar thicker
  };

  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{ style: { backgroundColor: 'transparent', boxShadow: '0px 0px 0px 0px '} }}>
      <DialogContent style={dialogContentStyle }>
        {progress >= 0 && (
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#4d94ff',
                height: '30px',
                borderRadius: '15px'
              },
              height: progressBarStyle.height,
              borderRadius: '15px'
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ProgressBar;