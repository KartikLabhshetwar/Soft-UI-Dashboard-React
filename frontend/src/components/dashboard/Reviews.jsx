import PropTypes from 'prop-types';

function Reviews({ stats }) {
  return (
    <div className="card">
      <div className="card-header pb-0">
        <h6 className="mb-0">Reviews</h6>
      </div>
      <div className="card-body pt-4 p-3">
        <div className="reviews-stats">
          {Object.entries(stats.reviews).map(([type, percentage]) => (
            <div key={type} className="mb-4">
              <div className="d-flex justify-content-between mb-2">
                <span className="text-sm font-weight-bold">{type}</span>
                <span className="text-sm font-weight-bold">{percentage}%</span>
              </div>
              <div className="progress">
                <div
                  className={`progress-bar bg-gradient-${
                    type === 'Positive Reviews' ? 'success' :
                    type === 'Neutral Reviews' ? 'warning' : 'danger'
                  }`}
                  role="progressbar"
                  aria-valuenow={percentage}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <p className="text-sm">
            More than <span className="font-weight-bold">{stats.developers.toLocaleString()}</span> developers used Creative Tim&apos;s products and over{' '}
            <span className="font-weight-bold">{stats.projects.toLocaleString()}</span> projects were created.
          </p>
          <button className="btn btn-dark btn-sm w-100">View all reviews</button>
        </div>
      </div>
    </div>
  );
}

Reviews.propTypes = {
  stats: PropTypes.shape({
    reviews: PropTypes.shape({
      'Positive Reviews': PropTypes.number.isRequired,
      'Neutral Reviews': PropTypes.number.isRequired,
      'Negative Reviews': PropTypes.number.isRequired
    }).isRequired,
    developers: PropTypes.number.isRequired,
    projects: PropTypes.number.isRequired
  }).isRequired
};

export default Reviews; 