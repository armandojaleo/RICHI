import express, { Request, Response } from 'express'

import User, { IUser } from '../models/User'

class UserController {

    app: express.Application;

    constructor() {
        this.app = express();
    }

    // Get all users
    public getUsers = async (req: Request, res: Response) => {
        const users = await User.find();
        if (!users) {
            return res.status(404).json('No Users found');
        }
        res.json(users);
    };

    // New user
    public createUser = async (req: Request, res: Response) => {

        // Email Validation
        const emailExists = await User.findOne({ email: req.body.email });
        if (emailExists) return res.status(400).json('Email already exists');

        try {
            const newUser: IUser = new User(req.body);
            newUser.password = await newUser.encrypPassword(newUser.password);
            await newUser.save();
            return res.json(newUser);
        } catch (e) {
            res.status(400).json(e);
        }
    };

    // Get one
    public getUser = async (req: Request, res: Response) => {
        const user = await User.findById(req.params.id, { password: 0 });
        if (!user) {
            return res.status(404).json('No User found');
        }
        res.json(user);
    };

    // Edit user
    public editUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        const user: IUser = new User(req.body);
        if (user.password) {
            user.password = await user.encrypPassword(user.password);
        }
        await User.findByIdAndUpdate(id, { $set: user }, { new: true });
        res.json(user);
    };

    // Delete user
    public deleteUser = async (req: Request, res: Response) => {
        await User.findByIdAndRemove(req.params.id);
        res.json({ status: 'User Deleted' });
    };
}

export default UserController;