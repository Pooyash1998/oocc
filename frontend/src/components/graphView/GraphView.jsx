// GraphView.jsx
import React from "react";
import './GraphView.scss';

function GraphView({ isOpen }) {
  return (
    <section className={`graphView ${isOpen ? 'open' : ''}`}>
      {/* Your GraphView content */}
    </section>
  );
}

export default GraphView;
