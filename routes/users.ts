import express, {Response, NextFunction} from "express";
import {User} from "../models/user";
import jwt from "jsonwebtoken";
import ICustomRequest from "../models/custom-request";
import {checkToken} from "../middleware/checkToken";

const router = express.Router();

router.get('/', checkToken, async (_req: ICustomRequest, res: Response, next: NextFunction): Promise<void> => {
    if (_req.token) {
            jwt.verify(_req.token, process.env.SECRET_KEY as string, async (err, authorziedData) => {
            if (err) {
                return res.sendStatus(403);
            }
            try {
                const results = await User.find({});
                return res.send(results);
            } catch (e) {
                console.error('Error fetching data:', e);
                return res.sendStatus(500);
            }
        });
        return;
    }
    res.sendStatus(403);
});

export {router};
