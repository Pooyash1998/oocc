// GraphView.jsx
import React from "react";
import './GraphView.scss';

function GraphView({ isOpen ,processedData}) {
    return (
      <section className={`graphView ${isOpen ? 'open' : ''}`}>
        {/* Display the processed data */}
        <div>
        <h3>Processed Data:</h3>
        <div>{processedData}</div>
        </div>
        {/* Your GraphView content */}
      </section>
    );
  }
  

export default GraphView;
