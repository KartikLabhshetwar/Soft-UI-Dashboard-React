import PropTypes from 'prop-types';

function StatisticsCard({ title, value, percentage, icon, color }) {
  return (
    <div className="card">
      <div className="card-body p-3">
        <div className="row g-0">
          <div className="col-8 col-sm-8">
            <div className="numbers">
              <p className="text-sm mb-0 text-capitalize font-weight-bold">{title}</p>
              <h5 className="font-weight-bolder mb-0">
                {value}
                {percentage && (
                  <span className={`text-${percentage > 0 ? 'success' : 'danger'} text-sm font-weight-bolder ms-2`}>
                    {percentage > 0 ? '+' : ''}{percentage}%
                  </span>
                )}
              </h5>
            </div>
          </div>
          <div className="col-4 col-sm-4 text-end">
            <div className={`icon icon-shape bg-gradient-${color} shadow text-center border-radius-md`}>
              <i className={`${icon} text-lg opacity-10`} aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

StatisticsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  percentage: PropTypes.number,
  icon: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};

export default StatisticsCard;
