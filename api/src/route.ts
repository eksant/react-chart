import { Application } from 'express';
import { config } from './config';
import { authRouter } from './auth/auth.route';
import { vaultRouter } from './vault/vault.route';

export const initRoutes = (app: Application) => {
  const apiPrefix = config.api.prefix;

  app.use(`${apiPrefix}/auth`, authRouter);
  app.use(`${apiPrefix}/vault`, vaultRouter);
};
