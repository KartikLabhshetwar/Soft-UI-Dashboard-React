import { Link, useLocation } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="sidebar-header p-3">
        <h4 className="mb-0">Soft UI Dashboard</h4>
      </div>
      <Nav className="flex-column">
        <Nav.Item>
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            <i className="fas fa-home me-2"></i>
            Dashboard
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link 
            to="/tables" 
            className={`nav-link ${location.pathname === '/tables' ? 'active' : ''}`}
          >
            <i className="fas fa-table me-2"></i>
            Tables
          </Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Sidebar; 