import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, LinearProgress } from '@mui/material';

function ProgressBar({triggerError, showProgressBar}) {
  const [open, setOpen] = useState(false);

    useEffect(() => {
      // Open the dialog when progress starts
      setOpen(true);
      let timeout;
      timeout = setTimeout(() => {
        triggerError("Processing time out!")
        showProgressBar(false);
      }, 1000);
      
      return () => clearTimeout(timeout);
  }, [showProgressBar, triggerError]);

  const handleClose = () => {
    setOpen(false);
  };

  const dialogContentStyle = {
    width: '80%', // Adjust the width as needed
    minWidth: '500px', // Minimum width to prevent it from becoming too narrow
  };

  const progressBarStyle = {
    height: '3px', // Adjust the height to make the progress bar thicker
  };

  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{ style: { backgroundColor: 'transparent', boxShadow: '0px 0px 0px 0px '} }}>
      <DialogContent style={dialogContentStyle }>
        {(
          <LinearProgress
            variant="indeterminate"
            sx={{
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#4b38fc',//'#ff8921',
                height: '3px',
                overflow: 'hidden',
                borderRadius: '10px'
              },
              height: progressBarStyle.height,
              borderRadius: '10px',
              alignItems: 'center'
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ProgressBar;
