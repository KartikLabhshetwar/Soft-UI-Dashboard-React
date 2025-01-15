import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function SalesOverview({ data }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        ...data,
        datasets: data.datasets.map(dataset => ({
          ...dataset,
          backgroundColor: 'rgba(203, 12, 159, 0.8)',
          borderColor: 'rgba(203, 12, 159, 0.8)',
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        interaction: {
          intersect: false,
          mode: 'index'
        },
        scales: {
          y: {
            grid: {
              drawBorder: false,
              display: true,
              drawOnChartArea: true,
              drawTicks: false,
              borderDash: [5, 5]
            },
            ticks: {
              display: true,
              padding: 10,
              color: '#9ca2b7'
            }
          },
          x: {
            grid: {
              drawBorder: false,
              display: true,
              drawOnChartArea: true,
              drawTicks: true
            },
            ticks: {
              display: true,
              color: '#9ca2b7',
              padding: 10
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="card">
      <div className="card-header pb-0 p-3">
        <div className="d-flex justify-content-between">
          <h6 className="mb-2">Sales Overview</h6>
        </div>
      </div>
      <div className="card-body p-3">
        <div className="chart">
          <canvas ref={chartRef} className="chart-canvas" height="300"></canvas>
        </div>
      </div>
    </div>
  );
}

SalesOverview.propTypes = {
  data: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    datasets: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        data: PropTypes.arrayOf(PropTypes.number).isRequired
      })
    ).isRequired
  }).isRequired
};

export default SalesOverview; 