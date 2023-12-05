import React from "react";
import * as d3 from "d3";
import './GraphView.scss';

function GraphView({ isOpen }) {

  return (
    <section className={`graphView ${isOpen ? 'open' : ''}`}>
      {/* Display the D3.js graph */}
    </section>
  );
}

export default GraphView;
