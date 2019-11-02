import express, { Request, Response } from 'express'
import HourRegistry, { IHourRegistry } from '../models/HourRegistry'

class HourRegistryController {

    app: express.Application;

    constructor() {
        this.app = express(); 
    }

    // Get all hourregistries
    public getHourRegistries = async (req: Request, res: Response) => {
        const hourregistries = await HourRegistry.find();
        if (!hourregistries) {
            return res.status(404).json('No HourRegistries found');
        }
        res.json(hourregistries);
    };

    // New hourregistry
    public createHourRegistry = async (req: Request, res: Response) => {
        try {
            const newHourRegistry: IHourRegistry = new HourRegistry(req.body);
            await newHourRegistry.save();
            return res.json(newHourRegistry);
        } catch (e) {
            res.status(400).json(e);
        }
    };

    // Get one
    public getHourRegistry = async (req: Request, res: Response) => {
        const hourregistry = await HourRegistry.findById(req.params.id);
        if (!hourregistry) {
            return res.status(404).json('No HourRegistry found');
        }
        res.json(hourregistry);
    };

    // Edit hourregistry
    public editHourRegistry = async (req: Request, res: Response) => {
        const { id } = req.params;
        const hourregistry = req.body;
        await HourRegistry.findByIdAndUpdate(id, { $set: hourregistry }, { new: true });
        res.json(hourregistry);
    };

    // Delete hourregistry
    public deleteHourRegistry = async (req: Request, res: Response) => {
        await HourRegistry.findByIdAndRemove(req.params.id);
        res.json({ status: 'HourRegistry Deleted' });
    };
}

export default HourRegistryController;