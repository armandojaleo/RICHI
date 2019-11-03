import { Router } from 'express';
const router = Router();

import { signup, signin, profile, users } from '../controllers/auth'
import { TokenValidation } from '../libs/verifyToken'

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/profile', TokenValidation, profile);
router.get('/users', TokenValidation, users);

export default router;
