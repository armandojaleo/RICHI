import { Router } from 'express';
const router = Router();

import EmployeeController from '../controllers/employee'
import { TokenValidation } from '../libs/verifyToken'

const employeeController = new EmployeeController

router.get('/', TokenValidation, employeeController.getEmployees)
router.post('/', TokenValidation , employeeController.createEmployee);
router.get('/:id', TokenValidation, employeeController.getEmployee);
router.put('/:id', TokenValidation, employeeController.editEmployee);
router.delete('/:id', TokenValidation, employeeController.deleteEmployee);

export default router;
