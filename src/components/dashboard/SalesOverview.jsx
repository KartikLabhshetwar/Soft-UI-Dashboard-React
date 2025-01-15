import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function SalesOverview({ data }) {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#fff',
        titleColor: '#000',
        bodyColor: '#000',
        borderColor: '#e9ecef',
        borderWidth: 1,
        padding: 8,
        usePointStyle: true,
        titleFont: {
          size: 12,
          family: "'Open Sans', sans-serif"
        },
        bodyFont: {
          size: 12,
          family: "'Open Sans', sans-serif"
        }
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
          borderDash: [5, 5],
          color: 'var(--chart-grid-color)'
        },
        ticks: {
          display: true,
          padding: 10,
          color: 'var(--chart-text-color)',
          font: {
            size: 12,
            family: "'Open Sans', sans-serif",
            style: 'normal',
            lineHeight: 2
          }
        }
      },
      x: {
        grid: {
          drawBorder: false,
          display: false,
          drawOnChartArea: false,
          drawTicks: false
        },
        ticks: {
          display: true,
          padding: 10,
          color: 'var(--chart-text-color)',
          font: {
            size: 12,
            family: "'Open Sans', sans-serif",
            style: 'normal',
            lineHeight: 2
          }
        }
      }
    }
  };

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Sales',
        tension: 0.15,
        pointRadius: 0,
        borderColor: '#000000',
        borderWidth: 2,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fill: true,
        data: data.datasets[0].data,
        maxBarThickness: 6
      }
    ]
  };

  return (
    <div className="chart-card">
      <div className="chart-container">
        <Line options={chartOptions} data={chartData} />
      </div>
      <div className="chart-footer">
        <h6 className="sales-overview-title">Sales Overview</h6>
        <p className="chart-subtitle">
          <span className="font-weight-bold">+15%</span> increase in today&apos;s sales
        </p>
        <hr className="horizontal dark" />
        <div className="chart-stat">
          <span className="chart-stat-label">Target:</span>
          <span className="chart-stat-value">
            Monthly sales target achieved ahead of schedule
          </span>
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
        data: PropTypes.arrayOf(PropTypes.number).isRequired
      })
    ).isRequired
  }).isRequired
};

export default SalesOverview;