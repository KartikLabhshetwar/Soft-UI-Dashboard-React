import { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
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
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [salesData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales',
        data: [450, 200, 100, 220, 500, 100],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4,
      },
    ],
  });

  const [usersData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Active Users',
        data: [320, 340, 365, 360, 370, 385],
        borderColor: 'rgb(203, 12, 159)',
        tension: 0.4,
      },
    ],
  });

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <Row className="mb-4">
        <Col lg={3} sm={6}>
          <Card className="mb-4">
            <Card.Body>
              <Row>
                <Col xs={8}>
                  <div className="numbers">
                    <p className="text-sm mb-0 text-uppercase font-weight-bold">Today&apos;s Money</p>
                    <h5 className="font-weight-bolder mb-0">
                      $53,000
                      <span className="text-success text-sm font-weight-bolder">+55%</span>
                    </h5>
                  </div>
                </Col>
                <Col xs={4} className="text-end">
                  <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                    <i className="fas fa-money-bill text-lg opacity-10" aria-hidden="true"></i>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} sm={6}>
          <Card className="mb-4">
            <Card.Body>
              <Row>
                <Col xs={8}>
                  <div className="numbers">
                    <p className="text-sm mb-0 text-uppercase font-weight-bold">Today&apos;s Users</p>
                    <h5 className="font-weight-bolder mb-0">
                      2,300
                      <span className="text-success text-sm font-weight-bolder">+3%</span>
                    </h5>
                  </div>
                </Col>
                <Col xs={4} className="text-end">
                  <div className="icon icon-shape bg-gradient-danger shadow text-center border-radius-md">
                    <i className="fas fa-users text-lg opacity-10" aria-hidden="true"></i>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg={6}>
          <Card className="mb-4">
            <Card.Body>
              <h6>Sales Overview</h6>
              <Line options={chartOptions} data={salesData} />
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card className="mb-4">
            <Card.Body>
              <h6>Users Overview</h6>
              <Line options={chartOptions} data={usersData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard; 