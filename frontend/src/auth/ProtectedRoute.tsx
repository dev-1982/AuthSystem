import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export function ProtectedRoute({
  children,
  requireAdmin = false
}: {
  children: JSX.Element;
  requireAdmin?: boolean;
}) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) return <Navigate to="/login" replace />;

  if (requireAdmin && user.role !== 'ADMIN') {
    return <Navigate to="/profile" replace />;
  }

  return children;
}
