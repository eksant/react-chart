import { Router } from 'express';
import { jwtVerify } from '../core/jwt.middleware';
import { AuthController } from './auth.controller';

const router = Router();
const authController = new AuthController();

router.post('/login', (req, res) => authController.login(req, res));
router.post(
  '/logout',
  (req, res, next) => jwtVerify(req, res, next),
  (req, res) => authController.logout(req, res)
);

export const authRouter = router;
