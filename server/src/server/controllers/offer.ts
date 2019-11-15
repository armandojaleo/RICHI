import express, { Request, Response } from 'express'
import Contract, { IContract } from '../models/Contract'
import Offer, { IOffer } from '../models/Offer'

class OfferController {

    app: express.Application;

    constructor() {
        this.app = express(); 
    }

    // Get all offers
    public getOffers = async (req: Request, res: Response) => {
        const offers = await Contract.find( {$or: [{assignedto: ""}, {assignedto: { $exists: false }}]} );
        if (!offers) {
            return res.status(404).json('No Offers found');
        }
        res.json(offers);
    };

    // Get one
    public getOffer = async (req: Request, res: Response) => {
        const offer = await Contract.findById(req.params.id);
        if (!offer) {
            return res.status(404).json('No Offer found');
        }
        res.json(offer);
    };

    // Apply User to Offer
    public applyUserToOffer = async (req: Request, res: Response) => {
        try {
            const newOffer: IOffer = new Offer(req.body);
            await newOffer.save();
            return res.json(newOffer);
        } catch (e) {
            res.status(400).json(e);
        }
    }
}

export default OfferController;