import React, { useState, useEffect } from 'react'
import { LinearProgress, Paper, Typography } from '@mui/material'

const ProgressBar = ({ uploadStatus, fileSize, onComplete }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const progressInterval = setInterval(() => {
      if (progress < 33 && uploadStatus === 'uploading') {
        setProgress(progress + 1)
      } else if (progress < 67 && fileSize) {
        setProgress(33 + (fileSize / 1024) * 0.33)
      } else if (progress < 100) {
        setProgress(100)
        clearInterval(progressInterval)
        onComplete()
      }
    }, 1000)

    return () => {
      clearInterval(progressInterval)
    }
  }, [progress, uploadStatus, fileSize, onComplete])

  return (
    <Paper style={{ padding: '20px', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <Typography variant="h6">Uploading...</Typography>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ marginTop: '10px' }}
      />
    </Paper>
  )
}

export default ProgressBar
