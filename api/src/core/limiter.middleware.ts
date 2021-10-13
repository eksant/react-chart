import { config } from '../config';
import * as rateLimit from 'express-rate-limit';

export const limiterMiddleware = () =>
  rateLimit({
    windowMs: config.api.limitTime * 1000,
    max: config.api.limitMaxHit,
  });
