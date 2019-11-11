import { Router } from 'express';
const router = Router();

import ResourceController from '../controllers/resource'
import { TokenValidation } from '../libs/verifyToken'

const resourceController = new ResourceController

router.get('/', TokenValidation, resourceController.getResources);
router.get('/:id', TokenValidation, resourceController.getResource);
router.post('/', TokenValidation, resourceController.createResource);
router.put('/:id', TokenValidation, resourceController.editResource);
router.delete('/:id', TokenValidation, resourceController.deleteResource);

export default router;
