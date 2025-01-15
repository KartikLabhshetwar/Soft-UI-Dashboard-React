import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js/auto';

const ChartCard = ({ 
  title, 
  description, 
  chart: { type, data, options },
  statistics = [] // New prop for statistics data
}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type,
      data: {
        ...data,
        datasets: data.datasets.map(dataset => ({
          ...dataset,
          fill: true,
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 0,
          pointBackgroundColor: dataset.borderColor,
          pointBorderColor: '#fff',
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointHoverBorderColor: 'transparent',
          backgroundColor: typeof dataset.borderColor === 'string' 
            ? `${dataset.borderColor}20`
            : dataset.borderColor
        }))
      },
      options: {
        ...options,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              boxWidth: 10,
              font: {
                size: 12,
                family: 'Open Sans',
                style: 'normal',
                lineHeight: 2
              }
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
              borderDash: [5, 5]
            },
            ticks: {
              display: true,
              padding: 10,
              color: '#b2b9bf',
              font: {
                size: 11,
                family: 'Open Sans',
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
              drawTicks: false,
              borderDash: [5, 5]
            },
            ticks: {
              display: true,
              color: '#b2b9bf',
              padding: 20,
              font: {
                size: 11,
                family: 'Open Sans',
                style: 'normal',
                lineHeight: 2
              }
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
  }, [type, data, options]);

  // Default statistics if none provided
  const defaultStats = [
    {
      title: 'Volume',
      value: '0',
      icon: 'ni ni-money-coins',
      color: 'primary',
      progress: 0
    },
    {
      title: 'Change',
      value: '0%',
      icon: 'ni ni-paper-diploma',
      color: 'info',
      progress: 0
    },
    {
      title: 'High',
      value: '0',
      icon: 'ni ni-cart',
      color: 'warning',
      progress: 0
    },
    {
      title: 'Low',
      value: '0',
      icon: 'ni ni-shop',
      color: 'danger',
      progress: 0
    }
  ];

  const displayStats = statistics.length > 0 ? statistics : defaultStats;

  return (
    <div className="card z-index-2">
      <div className="card-header pb-0 p-3">
        <div className="bg-white border-radius-lg py-3 pe-1 mb-3">
          <div className="chart">
            <canvas ref={chartRef} className="chart-canvas" height="300"></canvas>
          </div>
        </div>
        <h6 className="ms-2 mt-4 mb-0">{title}</h6>
        <p className="text-sm ms-2">{description}</p>
        <div className="container border-radius-lg">
          <div className="row">
            {displayStats.map((stat, index) => (
              <div key={index} className="col-6 col-md-3 py-3 ps-0">
                <div className="d-flex mb-2">
                  <div className={`icon icon-shape icon-xxs shadow border-radius-sm bg-gradient-${stat.color} text-center me-2 d-flex align-items-center justify-content-center`}>
                    <i className={`${stat.icon} text-white opacity-10`}></i>
                  </div>
                  <p className="text-xs mt-1 mb-0 font-weight-bold">{stat.title}</p>
                </div>
                <h4 className="font-weight-bolder">{stat.value}</h4>
                <div className="progress w-75">
                  <div 
                    className="progress-bar bg-dark" 
                    role="progressbar" 
                    style={{ width: `${stat.progress}%` }}
                    aria-valuenow={stat.progress} 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

ChartCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  chart: PropTypes.shape({
    type: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    options: PropTypes.object
  }).isRequired,
  statistics: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    progress: PropTypes.number.isRequired
  }))
};

export default ChartCard;
