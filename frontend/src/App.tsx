import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

import MainContent from './components/MainContent';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ApplicantDashboard from './pages/applicant/Dashboard';
import EmployerDashboard from './pages/employer/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import ApplyForm from './pages/applicant/ApplyForm';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route element={<MainLayout />}>
          <Route path='/' element={<MainContent />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>

        {/* Applicant Dashboard */}
        <Route
          element={
            <ProtectedRoute roles={['applicant']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path='/applicant/dashboard' element={<ApplicantDashboard />} />
        </Route>

        {/* Employer Dashboard */}
        <Route
          element={
            <ProtectedRoute roles={['employer']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path='/employer/dashboard' element={<EmployerDashboard />} />
        </Route>

        {/* Admin Dashboard */}
        <Route
          element={
            <ProtectedRoute roles={['admin']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
        </Route>

        {/* Applicant Apply Form */}
        <Route
          path='/apply/:jobId'
          element={
            <ProtectedRoute roles={['applicant']}>
              <ApplyForm />
            </ProtectedRoute>
          }
        />

        {/* Catch All */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
