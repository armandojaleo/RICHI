import { Router } from 'express';
const router = Router();

import UserController from '../controllers/user'
import { TokenValidation } from '../libs/verifyToken'

const userController = new UserController

router.get('/', TokenValidation, userController.getUsers);
router.get('/:id', TokenValidation, userController.getUser);
router.post('/', TokenValidation, userController.createUser);
router.put('/:id', TokenValidation, userController.editUser);
router.delete('/:id', TokenValidation, userController.deleteUser);

export default router;
