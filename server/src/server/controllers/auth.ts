import { Request, Response } from 'express'

import User, { IUser } from '../models/User'
import { signupValidation, signinValidation } from '../libs/joi'
import jwt from 'jsonwebtoken';

export const signup = async (req: Request, res: Response) => {
    // Validation
    const { error } = signupValidation(req.body);
    if (error) return res.status(400).json(error.message);

    // Email Validation
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).json('Email already exists');

    // Saving a new User
    try {
        const newUser: IUser = new User(req.body);
        newUser.password = await newUser.encrypPassword(newUser.password);
        //Generate first admin
        /*newUser.username = "admin";
        newUser.name = "Admin";
        newUser.email = "admin@test.com";
        newUser.password = await newUser.encrypPassword("admin1234");
        newUser.role = "Admin";*/
        const savedUser = await newUser.save();

        const token: string = jwt.sign({ 
            _id: savedUser._id,
            role: savedUser.role
         }, process.env['TOKEN_SECRET'] || '', {
            expiresIn: 60 * 60 * 24
        });
        res.header('auth-token', token).json(savedUser);
    } catch (e) {
        res.status(400).json(e);
    }
};

export const signin = async (req: Request, res: Response) => {
    const { error } = signinValidation(req.body);
    if (error) return res.status(400).json(error.message);
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json('Email or Password is wrong');
    const correctPassword = await user.validatePassword(req.body.password);
    if (!correctPassword) return res.status(400).json('Invalid Password');

    // Create a Token
    const token: string = jwt.sign({ 
        _id: user._id,
        role: user.role
     }, process.env['TOKEN_SECRET'] || '');
    res.header('auth-token', token).json(token);
};

export const profile = async (req: Request, res: Response) => {
    const user = await User.findById(req.userId, { password: 0 });
    if (!user) {
        return res.status(404).json('No User found');
    }
    res.json(user);
};