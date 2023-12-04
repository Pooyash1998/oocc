// GraphView.jsx
import React from "react";
import './GraphView.scss';

function GraphView({ isOpen }) {
    console.log('GraphView isOpen:', isOpen);
    return (
      <section className={`graphView ${isOpen ? 'open' : ''}`}>
        {/* Your GraphView content */}
      </section>
    );
  }
  

export default GraphView;
