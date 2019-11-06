import { Router } from 'express';
const router = Router();

import HourRegistryController from '../controllers/hourregistry'
import { TokenValidation } from '../libs/verifyToken'

const hourRegistryController = new HourRegistryController

router.get('/', TokenValidation, hourRegistryController.getHourRegistries)
router.post('/', TokenValidation , hourRegistryController.createHourRegistry);
router.get('/:id', TokenValidation, hourRegistryController.getHourRegistry);
router.put('/:id', TokenValidation, hourRegistryController.editHourRegistry);
router.delete('/:id', TokenValidation, hourRegistryController.deleteHourRegistry);

export default router;
