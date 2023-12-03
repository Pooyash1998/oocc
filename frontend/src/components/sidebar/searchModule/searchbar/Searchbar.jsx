import React, { useState } from 'react'
import './Searchbar.scss'

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
    <form onSubmit={handleSubmit} className='searchbar'>
      <input
      type="text"
      value={input}
      onChange={handleInputChange}
      placeholder="Search..."
    />
    <button type="submit">Search</button>
    </form>
  )
}

export default Searchbar
