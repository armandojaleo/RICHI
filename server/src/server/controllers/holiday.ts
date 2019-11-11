import express, { Request, Response } from 'express'
import Holiday, { IHoliday } from '../models/Holiday'

class HolidayController {

    app: express.Application;

    constructor() {
        this.app = express();
    }

    // Get all holidays
    public getHolidays = async (req: Request, res: Response) => {
        const holidays = await Holiday.find();
        if (!holidays) {
            return res.status(404).json('No Holidays found');
        }
        res.json(holidays);
    };

    // Get all holidays by user
    public getHolidaysByUser = async (req: Request, res: Response) => {
        const holidays = await Holiday.find({ user: req.params.user });
        if (!holidays) {
            return res.status(404).json('No Holidays found');
        }
        res.json(holidays);
    };

    // New holiday
    public createHoliday = async (req: Request, res: Response) => {
        try {
            const newHoliday: IHoliday = new Holiday(req.body);
            await newHoliday.save();
            return res.json(newHoliday);
        } catch (e) {
            res.status(400).json(e);
        }
    };

    // Get one
    public getHoliday = async (req: Request, res: Response) => {
        const holiday = await Holiday.findById(req.params.id);
        if (!holiday) {
            return res.status(404).json('No Holiday found');
        }
        res.json(holiday);
    };

    // Edit holiday
    public editHoliday = async (req: Request, res: Response) => {
        const { id } = req.params;
        const holiday = req.body;
        await Holiday.findByIdAndUpdate(id, { $set: holiday }, { new: true });
        res.json(holiday);
    };

    // Delete holiday
    public deleteHoliday = async (req: Request, res: Response) => {
        await Holiday.findByIdAndRemove(req.params.id);
        res.json({ status: 'Holiday Deleted' });
    };
}

export default HolidayController;