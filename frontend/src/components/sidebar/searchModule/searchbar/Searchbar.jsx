import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

const Searchbar = ({ onSubmit }) => {
  const [input, setInput] = useState('')

  const handleInputChange = (event) => {
    setInput(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(input)
    setInput('')
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 1 }}>
      <TextField
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Search..."
        variant="outlined"
        size="small"
        sx={{
          flexGrow: 1,
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px', // Rounded corners for the input field
            '& fieldset': {
              borderColor: '#4d4d4d' // Border color
            },
            '&:hover fieldset': {
              borderColor: '#666666' // Darker border on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: '#808080' // Border color when focused
            }
          }
        }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          borderRadius: '10px', // Rounded corners for the button
          backgroundColor: '#595959', // Button color
          '&:hover': {
            backgroundColor: '#333333' // Darker button on hover
          }
        }}
      >
        Search
      </Button>
    </Box>
  )
}

export default Searchbar
