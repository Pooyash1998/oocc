import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ precision, recall, width = 200, height = 200 }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Destroy previous chart instance if it exists
    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }

    // Create a new Chart instance with custom width and height
    chartRef.current.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Precision', 'Recall'],
        datasets: [
          {
            data: [precision, recall],
            backgroundColor: ['#36A2EB', '#F31544'],
          },
        ],
      },
      options: {
        aspectRatio: false, // Disable aspect ratio constraint
      },
    });

    // Clean up the chart instance on component unmount
    return () => {
      safelyCallDestroy(chartRef.current.chart);
      chartRef.current.chart = null;
    };

  }, [precision, recall, width, height]);

  // Update chart dimensions when width or height changes
  useEffect(() => {
    if (chartRef.current?.chart) {
      chartRef.current.chart.resize();
    }
  }, [width, height]);

  // Helper function to safely call destroy
  const safelyCallDestroy = (chartInstance) => {
    if (chartInstance) {
      chartInstance.destroy();
    }
  };

  return (
    <div style={{ width: `${width}px`, height: `${height}px` }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default PieChart;
