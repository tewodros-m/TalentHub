import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ApplicantDashboard from './pages/applicant/Dashboard';
import EmployerDashboard from './pages/employer/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import ApplyForm from './pages/applicant/ApplyForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route element={<MainLayout />}>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>

        {/* Dashboards */}
        <Route element={<DashboardLayout />}>
          <Route path='/applicant/dashboard' element={<ApplicantDashboard />} />
          <Route path='/employer/dashboard' element={<EmployerDashboard />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
        </Route>
        <Route path='/apply/:jobId' element={<ApplyForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
