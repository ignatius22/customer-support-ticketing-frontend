import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
  requireRole?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requireRole }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requireRole && user?.role !== requireRole) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
