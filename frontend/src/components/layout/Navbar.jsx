import { Navbar as BsNavbar, Container, Form, InputGroup } from 'react-bootstrap';

const Navbar = () => {
  return (
    <BsNavbar className="navbar px-0 mx-4 shadow-none border-radius-xl" expand="lg">
      <Container fluid>
        <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
          <div className="ms-md-auto pe-md-3 d-flex align-items-center">
            <InputGroup>
              <InputGroup.Text className="bg-white border-end-0">
                <i className="fas fa-search"></i>
              </InputGroup.Text>
              <Form.Control
                type="text"
                className="border-start-0"
                placeholder="Type here..."
              />
            </InputGroup>
          </div>
          <ul className="navbar-nav justify-content-end">
            <li className="nav-item d-flex align-items-center">
              <a href="#" className="nav-link text-body font-weight-bold px-0">
                <i className="fa fa-user me-sm-1"></i>
                <span className="d-sm-inline d-none">Sign In</span>
              </a>
            </li>
            <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
              <a href="#" className="nav-link text-body p-0" id="iconNavbarSidenav">
                <div className="sidenav-toggler-inner">
                  <i className="sidenav-toggler-line"></i>
                  <i className="sidenav-toggler-line"></i>
                  <i className="sidenav-toggler-line"></i>
                </div>
              </a>
            </li>
            <li className="nav-item px-3 d-flex align-items-center">
              <a href="#" className="nav-link text-body p-0">
                <i className="fa fa-cog fixed-plugin-button-nav cursor-pointer"></i>
              </a>
            </li>
            <li className="nav-item dropdown pe-2 d-flex align-items-center">
              <a href="#" className="nav-link text-body p-0" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fa fa-bell cursor-pointer"></i>
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </BsNavbar>
  );
};

export default Navbar; 