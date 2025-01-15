import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function Navbar({ onSidebarToggle }) {
  const location = useLocation();

  const getPageName = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/tables':
        return 'Tables';
      default:
        return '';
    }
  };

  return (
    <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" data-scroll="true">
      <div className="container-fluid py-1 px-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
            <li className="breadcrumb-item text-sm">
              <a className="opacity-5 text-dark" href="#">Pages</a>
            </li>
            <li className="breadcrumb-item text-sm text-dark active" aria-current="page">{getPageName()}</li>
          </ol>
          <h6 className="font-weight-bolder mb-0">{getPageName()}</h6>
        </nav>
        <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
          <div className="ms-md-auto pe-md-3 d-flex align-items-center">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Type here..." />
            </div>
          </div>
          <ul className="navbar-nav justify-content-end">
            <li className="nav-item d-flex align-items-center me-3">
              <button className="btn btn-outline-warning btn-sm mb-0">Online Builder</button>
            </li>
            <li className="nav-item d-flex align-items-center me-3">
              <a href="#" className="nav-link text-body font-weight-bold px-0">Sign In</a>
            </li>
            <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
              <a 
                href="javascript:;" 
                className="nav-link text-body p-0" 
                id="iconNavbarSidenav"
                onClick={onSidebarToggle}
              >
                <div className="sidenav-toggler-inner">
                  <i className="sidenav-toggler-line"></i>
                  <i className="sidenav-toggler-line"></i>
                  <i className="sidenav-toggler-line"></i>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  onSidebarToggle: PropTypes.func.isRequired
};

export default Navbar;