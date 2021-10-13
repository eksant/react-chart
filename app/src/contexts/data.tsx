import { api } from '@/utils';
import { Cookie } from '@/models';
import { useCookies } from 'react-cookie';
import { FC, useState, useContext, useCallback, createContext } from 'react';

const useValue = () => {
  const [hasLoading, setHasLoading] = useState(false);
  const [cookies] = useCookies([Cookie.Token]);

  const onFetchData = useCallback(
    async (endpoint: string, useToken: boolean = true) => {
      const token = useToken ? cookies[Cookie.Token] : undefined;
      const result = await api.getAxios(endpoint, token);

      if (result.meta.status === 401) {
        setTimeout(() => {
          window.location.href = '/';
        }, 500);
      }

      return result;
    },
    [cookies]
  );

  const onPostData = useCallback(async (endpoint: string, data?: any) => {
    setHasLoading(true);
    const result = await api.postAxios(endpoint, data);

    if (result.meta.status === 401) {
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
    }

    setHasLoading(false);
    return result;
  }, []);

  return { hasLoading, onFetchData, onPostData };
};

const DataContext = createContext({} as ReturnType<typeof useValue>);
const useData = () => useContext(DataContext);
const DataProvider: FC<any> = (props) => {
  return <DataContext.Provider value={useValue()} {...props} />;
};

export { DataProvider, useData };
