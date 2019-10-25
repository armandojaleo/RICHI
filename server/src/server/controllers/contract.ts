import express, { Request, Response } from 'express'
import Contract, { IContract } from '../models/Contract'

class ContractController {

    app: express.Application;

    constructor() {
        this.app = express(); 
    }

    // Get all contracts
    public getContracts = async (req: Request, res: Response) => {
        const contracts = await Contract.find();
        if (!contracts) {
            return res.status(404).json('No Contracts found');
        }
        res.json(contracts);
    };

    // New contract
    public createContract = async (req: Request, res: Response) => {
        try {
            const newContract: IContract = new Contract(req.body);
            await newContract.save();
            return res.json(newContract);
        } catch (e) {
            res.status(400).json(e);
        }
    };

    // Get one
    public getContract = async (req: Request, res: Response) => {
        const contract = await Contract.findById(req.params.id);
        if (!contract) {
            return res.status(404).json('No Contract found');
        }
        res.json(contract);
    };

    // Edit contract
    public editContract = async (req: Request, res: Response) => {
        const { id } = req.params;
        const contract = req.body;
        await Contract.findByIdAndUpdate(id, { $set: contract }, { new: true });
        res.json(contract);
    };

    // Delete contract
    public deleteContract = async (req: Request, res: Response) => {
        await Contract.findByIdAndRemove(req.params.id);
        res.json({ status: 'Contract Deleted' });
    };
}

export default ContractController;