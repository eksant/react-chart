import routes from '@/routes/routes';
import { Spin } from 'antd';
import { Fragment } from 'react';
import { useData } from '@/contexts';
import { Redirect, Route, Switch } from 'react-router-dom';

const AppRoutes = () => {
  const { hasLoading } = useData();

  if (hasLoading) return <Spin size="large" />;

  return (
    <Switch>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          exact={route.exact}
          render={(props) => {
            const components = [
              ...(route.guards || []),
              route.component,
              Fragment,
            ];

            const routeComponents = components
              .reverse()
              .reduce((Prev, Curr) => {
                return <Curr {...props}>{Prev}</Curr>;
              });

            return routeComponents;
          }}
        ></Route>
      ))}
      <Redirect to="/"></Redirect>
    </Switch>
  );
};

export default AppRoutes;
