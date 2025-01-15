import PropTypes from 'prop-types';

function TaskList({ tasks }) {
  return (
    <div className="card">
      <div className="card-header pb-0">
        <h6 className="mb-0">Projects Timeline</h6>
      </div>
      <div className="card-body p-3">
        <div className="timeline timeline-one-side">
          {tasks.map((task) => (
            <div key={task.id} className="timeline-block mb-3">
              <span className={`timeline-step ${task.status === 'done' ? 'bg-success' : task.status === 'pending' ? 'bg-warning' : 'bg-info'}`}>
                <i className={task.status === 'done' ? 'ni ni-check-bold' : task.status === 'pending' ? 'ni ni-time-alarm' : 'ni ni-bell-55'}></i>
              </span>
              <div className="timeline-content">
                <h6 className="text-dark text-sm font-weight-bold mb-0">{task.title}</h6>
                <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">{task.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['done', 'pending', 'scheduled']).isRequired
    })
  ).isRequired
};

export default TaskList; 