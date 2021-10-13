import { Router } from 'express';
import { jwtVerify } from '../core/jwt.middleware';
import { VaultController } from './vault.controller';

const router = Router();
const vaultController = new VaultController();

router.get(
  '/',
  (req, res, next) => jwtVerify(req, res, next),
  (req, res) => vaultController.get(req, res)
);
router.post(
  '/',
  (req, res, next) => jwtVerify(req, res, next),
  (req, res) => vaultController.insert(req, res)
);

export const vaultRouter = router;
