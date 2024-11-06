import express, {Request, Response, NextFunction} from "express";
import {User} from "../models/user";

const router = express.Router();

router.get('/', async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const results = await User.find({});
        res.status(200).send(results);
    } catch (e) {
        console.error('Error fetching data:', e);
        res.send('Server Error').status(500);
    }
});

export {router};
