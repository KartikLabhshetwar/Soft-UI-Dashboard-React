import PropTypes from 'prop-types';

const StatCard = ({ title, value, increase, icon, color }) => (
  <div className={`card bg-gradient-${color}`}>
    <div className="card-body p-3">
      <div className="row">
        <div className="col-8">
          <div className="numbers">
            <p className="text-sm mb-0 text-capitalize font-weight-bold opacity-7">{title}</p>
            <h5 className="font-weight-bolder mb-0 text-white">
              {value}
              {increase && (
                <span className="text-success text-sm font-weight-bolder ms-2">
                  +{increase}%
                </span>
              )}
            </h5>
          </div>
        </div>
        <div className="col-4 text-end">
          <div className="icon icon-shape bg-white shadow text-center border-radius-md d-flex align-items-center justify-content-center">
            <i className={icon} style={{ fontSize: '1.25rem', color: '#344767' }}></i>
          </div>
        </div>
      </div>
    </div>
  </div>
);

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  increase: PropTypes.number,
  icon: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};

function StatsCards({ stats }) {
  const cards = [
    {
      title: 'Users Active',
      value: stats.activeUsers.toLocaleString(),
      increase: stats.activeUsersIncrease,
      icon: 'fas fa-users',
      color: 'primary'
    },
    {
      title: 'Click Events',
      value: stats.clicks.toLocaleString(),
      increase: stats.clicksIncrease,
      icon: 'fas fa-mouse-pointer',
      color: 'info'
    },
    {
      title: 'Sales',
      value: `$${stats.purchases.toLocaleString()}`,
      increase: stats.purchasesIncrease,
      icon: 'fas fa-shopping-cart',
      color: 'success'
    },
    {
      title: 'Performance',
      value: stats.likes.toLocaleString(),
      increase: stats.likesIncrease,
      icon: 'fas fa-chart-line',
      color: 'warning'
    }
  ];

  return (
    <div className="row">
      {cards.map((card, index) => (
        <div key={index} className="col-xl-3 col-sm-6 mb-4">
          <StatCard {...card} />
        </div>
      ))}
    </div>
  );
}

StatsCards.propTypes = {
  stats: PropTypes.shape({
    activeUsers: PropTypes.number.isRequired,
    activeUsersIncrease: PropTypes.number.isRequired,
    clicks: PropTypes.number.isRequired,
    clicksIncrease: PropTypes.number.isRequired,
    purchases: PropTypes.number.isRequired,
    purchasesIncrease: PropTypes.number.isRequired,
    likes: PropTypes.number.isRequired,
    likesIncrease: PropTypes.number.isRequired
  }).isRequired
};

export default StatsCards; 