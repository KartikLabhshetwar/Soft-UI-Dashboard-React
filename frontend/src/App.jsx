import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

// Layout Components
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';

// Pages
import Dashboard from './pages/Dashboard';
import Tables from './pages/Tables';

function App() {
  return (
    <Router>
      <div className="wrapper">
        <Sidebar />
        <div className="main-content">
          <Navbar />
          <div className="container-fluid py-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tables" element={<Tables />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
