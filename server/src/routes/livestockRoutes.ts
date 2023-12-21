// routes.ts
import { Router } from 'express';
import * as LivestockController from '../controllers/LivestockController';

const router = Router();

router.get('/', LivestockController.getAllLivestock);
router.post('/', LivestockController.createLivestock);
router.put('/:id', LivestockController.updateLivestock);
router.delete('/:id', LivestockController.deleteLivestock);

export default router;
