import { Router } from 'express';
const router = Router();

import OfferController from '../controllers/offer'

const offerController = new OfferController

router.get('/', offerController.getOffers)
router.get('/:id', offerController.getOffer);

export default router;
