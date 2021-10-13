import { api } from '@/utils';
import { Cookie } from '@/models';
import { useCookies } from 'react-cookie';
import { FC, useState, useContext, useCallback, createContext } from 'react';

const useValue = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    Cookie.Token,
    Cookie.User,
  ]);
  const [user] = useState(cookies[Cookie.User]);
  const [hasToken] = useState(cookies[Cookie.Token]);

  const onLogin = useCallback(
    async (payload: any) => {
      const result = await api.postAxios('auth/login', payload);
      if (!!result.error) return result;

      setCookie(Cookie.User, result.data);
      setCookie(Cookie.Token, result.data.token);
      return result;
    },
    [setCookie]
  );

  const onLogout = useCallback(
    async (useToken: boolean = true) => {
      const token = useToken ? cookies[Cookie.Token] : undefined;
      const result = await api.postAxios('auth/logout', undefined, token);
      if (!!result.error) return result;

      removeCookie(Cookie.Token);
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
    },
    [cookies, removeCookie]
  );

  return { user, hasToken, onLogin, onLogout };
};

const AuthContext = createContext({} as ReturnType<typeof useValue>);
const useAuth = () => useContext(AuthContext);
const AuthProvider: FC<any> = (props) => {
  return <AuthContext.Provider value={useValue()} {...props} />;
};

export { AuthProvider, useAuth };
