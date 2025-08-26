import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import type { JSX } from 'react';

interface Props {
  children: JSX.Element;
  roles?: string[]; // optional role check
}

const ProtectedRoute = ({ children, roles }: Props) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  if (roles && (!user || !roles.includes(user.role))) {
    return <Navigate to='/' replace />; // unauthorized → redirect home
  }

  return children;
};

export default ProtectedRoute;
