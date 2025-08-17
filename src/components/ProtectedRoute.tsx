import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { user, isAdmin, isLoading } = useAuth();

  console.log('🛡️ ProtectedRoute check:', { 
    hasUser: !!user, 
    isAdmin, 
    isLoading, 
    requireAdmin 
  });

  if (isLoading) {
    console.log('⏳ Still loading...');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    console.log('❌ No user, redirecting to auth');
    return <Navigate to="/auth" replace />;
  }

  if (requireAdmin && !isAdmin) {
    console.log('🚫 Access denied - user is not admin');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground">You don't have permission to access this page.</p>
          <p className="text-xs text-muted-foreground mt-2">
            Debug: isAdmin = {String(isAdmin)}, requireAdmin = {String(requireAdmin)}
          </p>
        </div>
      </div>
    );
  }

  console.log('✅ Access granted');
  return <>{children}</>;
}