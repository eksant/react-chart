import { FC } from 'react';
import { useAuth } from '@/contexts';
import { Redirect } from 'react-router';

const AuthGuard: FC<any> = ({ children }) => {
  const { hasToken } = useAuth();
  if (hasToken) return <>{children}</>;
  return <Redirect to="/login"></Redirect>;
};

export default AuthGuard;
