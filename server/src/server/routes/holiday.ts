import { Router } from 'express';
const router = Router();

import HolidayController from '../controllers/holiday'
import { TokenValidation } from '../libs/verifyToken'

const holidayController = new HolidayController

router.get('/', TokenValidation, holidayController.getHolidays)
router.post('/', TokenValidation , holidayController.createHoliday);
router.get('/:id', TokenValidation, holidayController.getHoliday);
router.put('/:id', TokenValidation, holidayController.editHoliday);
router.delete('/:id', TokenValidation, holidayController.deleteHoliday);

export default router;
