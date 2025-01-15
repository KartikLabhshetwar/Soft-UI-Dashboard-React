import { useState, useEffect } from 'react';
import StatsCards from '../components/dashboard/StatsCards';
import SalesOverview from '../components/dashboard/SalesOverview';
import TaskList from '../components/dashboard/TaskList';
import OrdersOverview from '../components/dashboard/OrdersOverview';
import Reviews from '../components/dashboard/Reviews';
import {
  fetchUserStats,
  fetchSalesData,
  fetchTasks,
  fetchOrders,
  fetchReviews
} from '../services/api';

function Dashboard() {
  const [userStats, setUserStats] = useState(null);
  const [salesData, setSalesData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reviewsStats, setReviewsStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [
          statsResponse,
          salesResponse,
          tasksResponse,
          ordersResponse,
          reviewsResponse
        ] = await Promise.all([
          fetchUserStats(),
          fetchSalesData(),
          fetchTasks(),
          fetchOrders(),
          fetchReviews()
        ]);

        setUserStats(statsResponse);
        setSalesData(salesResponse);
        setTasks(tasksResponse);
        setOrders(ordersResponse);
        setReviewsStats(reviewsResponse);
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

      <div className="row mt-4">
        <div className="col-lg-8 mb-4">
          <SalesOverview data={salesData} />
        </div>
        <div className="col-lg-4 mb-4">
          <TaskList tasks={tasks} />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-lg-8 mb-4">
          <OrdersOverview orders={orders} />
        </div>
        <div className="col-lg-4 mb-4">
          <Reviews stats={reviewsStats} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 