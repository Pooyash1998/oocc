import React, { useState } from 'react'
import Searchbar from './searchbar'
import Tags from './tags'
import Box from '@mui/material/Box'

const SearchModule = () => {
  const [tags, setTags] = useState([])

  const handleSubmit = (term) => {
    if (term && !tags.includes(term)) {
      setTags([...tags, term])
    }
  }

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  return (
    <Box sx={{ p: 2 }}>
      <Searchbar onSubmit={handleSubmit} />
      <Tags tags={tags} onRemoveTag={removeTag} />
    </Box>
  )
}

export default SearchModule
