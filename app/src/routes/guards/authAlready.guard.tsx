import { FC } from 'react';
import { useAuth } from '@/contexts';
import { Redirect } from 'react-router';

const AuthAlreadyGuard: FC<any> = ({ children }) => {
  const { hasToken } = useAuth();
  if (!hasToken) return <>{children}</>;
  return <Redirect to="/"></Redirect>;
};

export default AuthAlreadyGuard;
