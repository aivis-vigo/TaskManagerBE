import express, {Request, Response, NextFunction} from "express";
import mongoose from "mongoose";
import {User} from "../models/user";

mongoose.connect(process.env.ATLAS_URI as string)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

const router = express.Router();

router.get('/', async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const results = await User.find({}).limit(10);
        res.status(200).send(results);
    } catch (e) {
        console.error('Error fetching data:', e);
        res.send('Server Error').status(500);
    }
});

router.post('/', async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users = await User.insertMany(_req.body);
        res.status(201).send(users);
    } catch (e) {
        console.error('Error adding data to the database:', e);
    }
});

export {router};
