import { Router } from 'express';
const router = Router();

import ContractController from '../controllers/contract'
import { TokenValidation } from '../libs/verifyToken'

const ContractController = new ContractController

router.get('/', TokenValidation, ContractController.getContracts)
router.post('/', TokenValidation , ContractController.createContract);
router.get('/:id', TokenValidation, ContractController.getContract);
router.put('/:id', TokenValidation, ContractController.editContract);
router.delete('/:id', TokenValidation, ContractController.deleteContract);

export default router;
