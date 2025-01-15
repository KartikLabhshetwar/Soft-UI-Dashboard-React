function ProjectsTable() {
  const projects = [
    {
      id: 1,
      name: 'Spotify',
      logo: '/assets/img/small-logos/logo-spotify.svg',
      budget: '$2,500',
      status: 'working',
      completion: 60,
      members: ['/assets/img/team-1.jpg', '/assets/img/team-2.jpg', '/assets/img/team-3.jpg', '/assets/img/team-4.jpg']
    },
    {
      id: 2,
      name: 'Invision',
      logo: '/assets/img/small-logos/logo-invision.svg',
      budget: '$5,000',
      status: 'done',
      completion: 100,
      members: ['/assets/img/team-4.jpg', '/assets/img/team-3.jpg']
    },
    {
      id: 3,
      name: 'Jira',
      logo: '/assets/img/small-logos/logo-jira.svg',
      budget: '$3,400',
      status: 'canceled',
      completion: 30,
      members: ['/assets/img/team-2.jpg', '/assets/img/team-1.jpg']
    },
    {
      id: 4,
      name: 'Slack',
      logo: '/assets/img/small-logos/logo-slack.svg',
      budget: '$1,000',
      status: 'canceled',
      completion: 0,
      members: ['/assets/img/team-3.jpg', '/assets/img/team-2.jpg']
    },
    {
      id: 5,
      name: 'Webdev',
      logo: '/assets/img/small-logos/logo-webdev.svg',
      budget: '$14,000',
      status: 'working',
      completion: 80,
      members: ['/assets/img/team-4.jpg', '/assets/img/team-3.jpg', '/assets/img/team-2.jpg', '/assets/img/team-1.jpg']
    },
    {
      id: 6,
      name: 'Adobe XD',
      logo: '/assets/img/small-logos/logo-xd.svg',
      budget: '$2,300',
      status: 'done',
      completion: 100,
      members: ['/assets/img/team-1.jpg', '/assets/img/team-4.jpg']
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'done':
        return 'success';
      case 'working':
        return 'info';
      case 'canceled':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="card mb-4 custom-table-card">
      <div className="card-header pb-0">
        <h6>Projects table</h6>
      </div>
      <div className="card-body px-0 pt-0 pb-2">
        <div className="table-responsive p-0" style={{ 
          minWidth: '95%',
          margin: '0 auto'
        }}>
          <table className="table align-items-center justify-content-center mb-0">
            <thead>
              <tr>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Project</th>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Budget</th>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Status</th>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">Completion</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>
                    <div className="d-flex px-2">
                      <div>
                        <img src={project.logo} className="avatar avatar-sm rounded-circle me-2" alt={project.name} />
                      </div>
                      <div className="my-auto">
                        <h6 className="mb-0 text-sm">{project.name}</h6>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="text-sm font-weight-bold mb-0">{project.budget}</p>
                  </td>
                  <td>
                    <span className="text-xs font-weight-bold">{project.status}</span>
                  </td>
                  <td className="align-middle text-center">
                    <div className="d-flex align-items-center justify-content-center">
                      <span className="me-2 text-xs font-weight-bold">{project.completion}%</span>
                      <div>
                        <div className="progress">
                          <div
                            className={`progress-bar bg-gradient-${getStatusColor(project.status)}`}
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
                  <td className="align-middle">
                    <div className="avatar-group d-flex justify-content-end">
                      {project.members.map((member, index) => (
                        <a
                          key={index}
                          href="javascript:;"
                          className="avatar avatar-xs rounded-circle"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          title="Member"
                        >
                          <img src={member} alt="Member" />
                        </a>
                      ))}
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

export default ProjectsTable; 