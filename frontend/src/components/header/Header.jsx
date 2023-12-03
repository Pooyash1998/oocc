import React, { useState } from 'react'
import ImportButton from './importButton'
import UploadModule from './uploadModule'
import { Layout } from 'antd'

const { Header1 } = Layout
function Header () {
  const [isModalOpen, setModalOpen] = useState(false)

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  return (
    <Header1 style={{ background: '#fff', padding: 0 }}>
      <section className="header">
        <section className="header_text">Mirror</section>
        <section className="header_importButton">
            <ImportButton openModal={openModal} /> {/* Import Button */}
            {isModalOpen && <UploadModule closeModal={closeModal} />} {/* Conditional rendering of Upload Module */}
        </section>
      </section>
    </Header1>
  )
}

export default Header
