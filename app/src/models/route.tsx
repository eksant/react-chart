import { FC } from 'react';

export interface IRoute {
  path: string;
  exact?: boolean;
  component: FC<any>;
  guards?: any[];
}

export default IRoute;
