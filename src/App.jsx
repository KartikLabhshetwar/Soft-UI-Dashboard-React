import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Dashboard from './pages/Dashboard';
import Tables from './pages/Tables';
import { useState } from 'react';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className={`g-sidenav-show ${isSidebarOpen ? 'g-sidenav-pinned' : ''}`}>
        <Sidebar isOpen={isSidebarOpen} />
        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
          <Navbar onSidebarToggle={toggleSidebar} />
          <div className="container-fluid py-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tables" element={<Tables />} />
            </Routes>
            <Footer />
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
