import { useState, useEffect } from 'react';
import ChartCard from '../components/charts/ChartCard';
import StatisticsCard from '../components/charts/StatisticsCard';
import { fetchStockData, fetchMarketOverview, fetchDailyMetrics } from '../services/api';

function Dashboard() {
  const [stockData, setStockData] = useState(null);
  const [marketData, setMarketData] = useState(null);
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [stockResponse, marketResponse, metricsResponse] = await Promise.all([
          fetchStockData(),
          fetchMarketOverview(),
          fetchDailyMetrics()
        ]);

        setStockData(stockResponse);
        setMarketData(marketResponse);
        setMetrics(metricsResponse);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-5 text-danger">Error: {error}</div>;
  }

  return (
    <>
      <div className="row">
        {metrics.map((metric, index) => (
          <div className="col-xl-3 col-sm-6 mb-4" key={metric.symbol}>
            <StatisticsCard
              title={metric.symbol}
              value={`$${metric.price}`}
              percentage={parseFloat(metric.percentChange)}
              icon="ni ni-money-coins"
              color={index % 2 === 0 ? 'primary' : 'success'}
            />
          </div>
        ))}
      </div>

      <div className="row mt-4">
        <div className="col-lg-7 mb-4">
          <ChartCard
            title="Stock Performance"
            description="Daily closing prices for the last 30 days"
            chart={{
              type: 'line',
              data: stockData
            }}
            statistics={[
              {
                title: 'Volume',
                value: stockData?.volume || '0',
                icon: 'ni ni-money-coins',
                color: 'primary',
                progress: 60
              },
              {
                title: 'Change',
                value: `${stockData?.change || '0'}%`,
                icon: 'ni ni-paper-diploma',
                color: 'info',
                progress: Math.abs(stockData?.change || 0)
              },
              {
                title: 'High',
                value: stockData?.high || '0',
                icon: 'ni ni-cart',
                color: 'warning',
                progress: 75
              },
              {
                title: 'Low',
                value: stockData?.low || '0',
                icon: 'ni ni-shop',
                color: 'danger',
                progress: 30
              }
            ]}
          />
        </div>
        <div className="col-lg-5 mb-4">
          <ChartCard
            title="Market Overview"
            description="Sector performance comparison"
            chart={{
              type: 'bar',
              data: marketData
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Dashboard; 