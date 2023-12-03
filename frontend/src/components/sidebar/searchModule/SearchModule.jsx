import React, { useState } from 'react'
import Searchbar from './searchbar'
import Tags from './tags'

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
    <div className='searchmodule'>
        <Searchbar onSubmit={handleSubmit} />
        <Tags tags={tags} onRemoveTag={removeTag} />
    </div>
  )
}

export default SearchModule
