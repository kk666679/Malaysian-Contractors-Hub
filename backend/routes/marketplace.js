import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import {
  getServices,
  createService,
  getSuppliers
} from '../controllers/marketplaceController.js';

const router = express.Router();

router.get('/services', getServices);
router.get('/suppliers', getSuppliers);

router.use(authenticateToken);
router.post('/services', createService);

export default router;