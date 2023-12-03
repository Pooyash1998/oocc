import React, { useState } from 'react'
import ImportButton from '../importButton'
import UploadModule from '../uploadModule'
import './Header.scss'

function Header () {
  const [isModalOpen, setModalOpen] = useState(false)

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  return (
    <section className="header">
        <section className="header_text">Mirror</section>
        <section className="header_importButton">
            <ImportButton openModal={openModal} /> {/* Import Button */}
            {isModalOpen && <UploadModule closeModal={closeModal} />} {/* Conditional rendering of Upload Module */}
        </section>
    </section>
  )
}

export default Header
