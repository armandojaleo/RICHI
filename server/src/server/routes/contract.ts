import { Router } from 'express';
const router = Router();

import ContractController from '../controllers/contract'
import { TokenValidation } from '../libs/verifyToken'

const contractController = new ContractController

router.get('/', TokenValidation, contractController.getContracts)
router.post('/', TokenValidation , contractController.createContract);
router.get('/:id', TokenValidation, contractController.getContract);
router.put('/:id', TokenValidation, contractController.editContract);
router.delete('/:id', TokenValidation, contractController.deleteContract);

export default router;
