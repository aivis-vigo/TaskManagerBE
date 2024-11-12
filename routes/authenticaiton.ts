import express, {NextFunction, Request, Response} from "express";
import {User} from "../models/user";
import jwt from "jsonwebtoken";

export const router = express.Router();

router.post('/', async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await User.findOne({
            username: _req.body.username,
            password: _req.body.password
        });

        if (!user) {
            res.status(401).send({message: 'Invalid username or password'});
        }

        jwt.sign({user}, process.env.SECRET_KEY as string, {expiresIn: '1h'}, (err, token) => {
            if (err) {
                res.send({message: 'Invalid token'});
            }
            res.send({user, token});
        })
    } catch (e) {
        next(e);
    }
});