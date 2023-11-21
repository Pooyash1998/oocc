import React, { useState } from 'react';
import ImportButton from '../importButton'; // Importing the ImportButton component
import UploadModule from '../uploadModule'; // Importing the UploadModule component
import './Header.scss'; // Importing SCSS for styling

function Header() {
    const [isModalOpen, setModalOpen] = useState(false); // State to track if the modal is open

    const openModal = () => setModalOpen(true); // Function to open the modal
    const closeModal = () => setModalOpen(false); // Function to close the modal

    return (
        <section className="header">
            <section className="header_text">Mirror</section>
            <section className="header_importButton">
                <ImportButton openModal={openModal} /> {/* Import Button */}
                {isModalOpen && <UploadModule closeModal={closeModal} />} {/* Conditional rendering of Upload Module */}
            </section>
        </section>
    );
}

export default Header;