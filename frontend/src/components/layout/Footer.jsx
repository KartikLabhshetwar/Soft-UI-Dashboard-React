function Footer() {
  return (
    <footer className="footer pt-3">
      <div className="container-fluid">
        <div className="row align-items-center justify-content-lg-between">
          <div className="col-lg-6 mb-lg-0 mb-4">
            <div className="copyright text-center text-sm text-muted text-lg-start">
              © {new Date().getFullYear()}, made with {" "}
              <i className="fa fa-heart"></i> by{" "}
              <span className="font-weight-bold">Kartik Labhshetwar</span>{" "}
              for a better web.
            </div>
          </div>
          <div className="col-lg-6">
            <ul className="nav nav-footer justify-content-center justify-content-lg-end">
              <li className="nav-item">
                <span className="nav-link text-muted">Kartik Labhshetwar</span>
              </li>
              <li className="nav-item">
                <span className="nav-link text-muted">About Us</span>
              </li>
              <li className="nav-item">
                <span className="nav-link text-muted">Blog</span>
              </li>
              <li className="nav-item">
                <span className="nav-link pe-0 text-muted">License</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
