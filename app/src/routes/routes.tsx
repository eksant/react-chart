import { IRoute } from '@/models';
import { ChartPage, LoginPage } from '@/pages';
import { AuthAlreadyGuard, AuthGuard } from './guards';

const routes: IRoute[] = [
  {
    path: '/login',
    exact: true,
    component: LoginPage,
    guards: [AuthAlreadyGuard],
  },
  {
    path: '/',
    exact: true,
    component: ChartPage,
    guards: [AuthGuard],
  },
];

export default routes;
