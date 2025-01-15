import PropTypes from 'prop-types';

const StatCard = ({ title, value, increase, icon, color }) => (
  <div className={`card bg-gradient-${color}`}>
    <div className="card-body p-3">
      <div className="row">
        <div className="col-8">
          <div className="numbers">
            <p className="text-white text-sm mb-0 text-capitalize font-weight-bold">{title}</p>
            <h5 className="text-white font-weight-bolder mb-0">
              {value}
              {increase && (
                <span className="text-success text-sm font-weight-bolder">
                  +{increase}%
                </span>
              )}
            </h5>
          </div>
        </div>
        <div className="col-4 text-end">
          <div className="icon icon-shape bg-white shadow text-center border-radius-md">
            <i className={`${icon} text-dark text-lg opacity-10`} aria-hidden="true"></i>
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
      icon: 'ni ni-circle-08',
      color: 'primary'
    },
    {
      title: 'Click Events',
      value: stats.clicks.toLocaleString(),
      increase: stats.clicksIncrease,
      icon: 'ni ni-like-2',
      color: 'dark'
    },
    {
      title: 'Purchases',
      value: stats.purchases.toLocaleString(),
      increase: stats.purchasesIncrease,
      icon: 'ni ni-cart',
      color: 'dark'
    },
    {
      title: 'Likes',
      value: stats.likes.toLocaleString(),
      increase: stats.likesIncrease,
      icon: 'ni ni-favourite-28',
      color: 'dark'
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