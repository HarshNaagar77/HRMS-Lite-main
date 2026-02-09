
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { RiDashboardLine, RiTeamLine, RiCalendarCheckLine } from 'react-icons/ri';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Attendance from './pages/Attendance';

function Sidebar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  return (
    <aside className="h-screen w-64 bg-gradient-to-b from-blue-700 to-blue-500 text-white flex flex-col py-8 px-4 shadow-xl">
      <div className="mb-10 flex items-center gap-2 px-2">
        <span className="text-2xl font-bold tracking-tight">HRMS</span>
        <span className="text-blue-200 text-base font-light">Lite</span>
      </div>
      <nav className="flex flex-col gap-2 mt-4">
        <Link
          to="/"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all ${
            isActive('/') ? 'bg-white/20 shadow text-white' : 'hover:bg-white/10 text-blue-100'
          }`}
        >
          <RiDashboardLine className="text-xl" />
          Dashboard
        </Link>
        <Link
          to="/employees"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all ${
            isActive('/employees') ? 'bg-white/20 shadow text-white' : 'hover:bg-white/10 text-blue-100'
          }`}
        >
          <RiTeamLine className="text-xl" />
          Employees
        </Link>
        <Link
          to="/attendance"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all ${
            isActive('/attendance') ? 'bg-white/20 shadow text-white' : 'hover:bg-white/10 text-blue-100'
          }`}
        >
          <RiCalendarCheckLine className="text-xl" />
          Attendance
        </Link>
      </nav>
      <div className="mt-auto text-xs text-blue-200 px-2 pt-10">Minimal & Modern</div>
    </aside>
  );
}

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <Sidebar />
        <main className="flex-1 flex flex-col items-center justify-start py-12 px-6">
          <div className="w-full max-w-4xl">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/attendance" element={<Attendance />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
