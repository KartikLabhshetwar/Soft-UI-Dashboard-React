import axios from 'axios';

const BASE_URL = 'https://www.alphavantage.co/query';
const ALPHA_VANTAGE_API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;

const MOCK_STOCK_DATA = {
  AAPL: {
    prices: [150.23, 151.45, 149.89, 152.34, 153.21],
    volume: 1234567,
    change: 2.5
  },
  GOOGL: {
    prices: [2750.12, 2780.45, 2795.67, 2810.23, 2830.45],
    volume: 987654,
    change: 1.8
  }
};

export const fetchStockData = async () => {
  try {
    // For development, return mock data
    return MOCK_STOCK_DATA;

    // When ready for real API:
    // const response = await axios.get('your-stock-api-endpoint');
    // return response.data || MOCK_STOCK_DATA;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return MOCK_STOCK_DATA; // Fallback to mock data on error
  }
};

export const fetchMarketOverview = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        function: 'SECTOR',
        apikey: ALPHA_VANTAGE_API_KEY
      }
    });

    const sectorData = response.data['Rank A: Real-Time Performance'];
    const sectors = Object.keys(sectorData);
    const performance = sectors.map(sector => parseFloat(sectorData[sector].replace('%', '')));

    return {
      labels: sectors,
      datasets: [{
        label: 'Sector Performance',
        data: performance,
        backgroundColor: '#cb0c9f',
        borderRadius: 5
      }]
    };
  } catch (error) {
    console.error('Error fetching market overview:', error);
    throw error;
  }
};

export const fetchDailyMetrics = async () => {
  try {
    const symbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN'];
    const promises = symbols.map(symbol => 
      axios.get(`${BASE_URL}`, {
        params: {
          function: 'GLOBAL_QUOTE',
          symbol,
          apikey: ALPHA_VANTAGE_API_KEY
        }
      })
    );

    const responses = await Promise.all(promises);
    return responses.map((response, index) => {
      const quote = response.data['Global Quote'];
      return {
        symbol: symbols[index],
        price: parseFloat(quote['05. price']).toFixed(2),
        change: parseFloat(quote['09. change']).toFixed(2),
        percentChange: parseFloat(quote['10. change percent']).toFixed(2)
      };
    });
  } catch (error) {
    console.error('Error fetching daily metrics:', error);
    throw error;
  }
};
