import PropTypes from 'prop-types';

function OrdersOverview({ orders }) {
  return (
    <div className="card">
      <div className="card-header pb-0">
        <h6 className="mb-0">Orders Overview</h6>
        <p className="text-sm">
          <i className="fa fa-arrow-up text-success"></i>
          <span className="font-weight-bold">24%</span> this month
        </p>
      </div>
      <div className="card-body p-3">
        {orders.map((order) => (
          <div key={order.id} className="timeline timeline-one-side">
            <div className="timeline-block mb-3">
              <span className={`timeline-step ${
                order.status === 'Completed' ? 'bg-success' :
                order.status === 'In Progress' ? 'bg-info' :
                'bg-warning'
              }`}>
                <i className="ni ni-cart text-white"></i>
              </span>
              <div className="timeline-content">
                <h6 className="text-dark text-sm font-weight-bold mb-0">
                  {order.status} order #{order.id}
                </h6>
                <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">
                  {order.date}
                </p>
                <p className="text-sm mt-3 mb-2">
                  Revenue: {order.revenue} | Visitors: {order.visitors}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

OrdersOverview.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      revenue: PropTypes.string.isRequired,
      visitors: PropTypes.number.isRequired
    })
  ).isRequired
};

export default OrdersOverview; 