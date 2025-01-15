import { useState, useEffect } from 'react';
import StatsCards from '../components/dashboard/StatsCards';
import { fetchUserStats } from '../services/api';

function Dashboard() {
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const statsResponse = await fetchUserStats();
        setUserStats(statsResponse);
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
    <div className="container-fluid py-4">
      <StatsCards stats={userStats} />
    </div>
  );
}

export default Dashboard; 