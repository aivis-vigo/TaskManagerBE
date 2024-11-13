import express, {Response, NextFunction} from "express";
import ICustomRequest from "../models/custom-request";
import {checkToken} from "../middleware/checkToken";
import {verifyToken} from "../util/verifyToken";
import {Role} from "../models/role";

const router = express.Router();

router.get('/', checkToken, async (_req: ICustomRequest, res: Response, next: NextFunction): Promise<void> => {
    if (_req.token) {
        await verifyToken(_req.token, process.env.SECRET_KEY as string, res, async () => {
            const results = await Role.find({});
            res.send(results);
        })
        return;
    }
    res.sendStatus(403);
});

export {router};
