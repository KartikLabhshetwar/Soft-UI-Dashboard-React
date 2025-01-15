import PropTypes from 'prop-types';

function ProjectsTable({ projects }) {
  return (
    <div className="card">
      <div className="card-header pb-0">
        <div className="row">
          <div className="col-lg-6 col-7">
            <h6>Projects</h6>
            <p className="text-sm mb-0">
              <i className="fa fa-check text-info" aria-hidden="true"></i>
              <span className="font-weight-bold ms-1">30 done</span> this month
            </p>
          </div>
        </div>
      </div>
      <div className="card-body px-0 pb-2">
        <div className="table-responsive">
          <table className="table align-items-center mb-0">
            <thead>
              <tr>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">COMPANIES</th>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">MEMBERS</th>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">BUDGET</th>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">COMPLETION</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>
                    <div className="d-flex px-2 py-1">
                      <div>
                        <img src={project.logo} className="avatar avatar-sm me-3" alt={project.name} />
                      </div>
                      <div className="d-flex flex-column justify-content-center">
                        <h6 className="mb-0 text-sm">{project.name}</h6>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="avatar-group">
                      {project.members.map((member, index) => (
                        <span key={index} className="avatar avatar-xs rounded-circle">
                          <img alt="member" src={member} className="rounded-circle" />
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span className="text-xs font-weight-bold">
                      {project.budget ? `$${project.budget.toLocaleString()}` : 'Not set'}
                    </span>
                  </td>
                  <td className="align-middle text-sm" style={{ width: '30%' }}>
                    <div className="d-flex align-items-center">
                      <span className="me-2 text-xs font-weight-bold">{project.completion}%</span>
                      <div>
                        <div className="progress">
                          <div
                            className={`progress-bar ${
                              project.completion === 100 ? 'bg-success' :
                              project.completion >= 60 ? 'bg-info' :
                              project.completion >= 30 ? 'bg-warning' : 'bg-danger'
                            }`}
                            role="progressbar"
                            aria-valuenow={project.completion}
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{ width: `${project.completion}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

ProjectsTable.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      logo: PropTypes.string.isRequired,
      members: PropTypes.arrayOf(PropTypes.string).isRequired,
      budget: PropTypes.number,
      completion: PropTypes.number.isRequired
    })
  ).isRequired
};

export default ProjectsTable; 