import React from 'react'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'

const Tags = ({ tags, onRemoveTag }) => {
  return (
    <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
      {tags.map(tag => (
        <Chip
          key={tag}
          label={tag}
          onDelete={() => onRemoveTag(tag)}
          sx={{ backgroundColor: '#cccccc' }}
        />
      ))}
    </Box>
  )
}

export default Tags
