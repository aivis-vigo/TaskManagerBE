import express, {Response, NextFunction} from "express";
import {User} from "../models/user";
import ICustomRequest from "../models/custom-request";
import {checkToken} from "../middleware/checkToken";
import {verifyToken} from "../util/verifyToken";

const router = express.Router();

router.get('/', checkToken, async (_req: ICustomRequest, res: Response, next: NextFunction): Promise<void> => {
    if (_req.token) {
        await verifyToken(_req.token, process.env.SECRET_KEY as string, res, async () => {
            const results = await User.find({});
            res.send(results);
        })
        return;
    }
    res.sendStatus(403);
});

router.get('/:userId', checkToken, async (_req: ICustomRequest, res: Response, next: NextFunction): Promise<void> => {
    if (_req.token) {
        await verifyToken(_req.token, process.env.SECRET_KEY as string, res, async () => {
            const userId = _req.params.userId;
            const results = await User.findOne({_id: userId});
            res.send(results);
        })
        return;
    }
    res.sendStatus(403);
});

router.put('/update/:userId', checkToken, async (_req: ICustomRequest, res: Response, next: NextFunction): Promise<void> => {
    if (_req.token) {
        await verifyToken(_req.token, process.env.SECRET_KEY as string, res, async () => {
            await User.findByIdAndUpdate({_id: _req.params.userId}, _req.body);
            const user = await User.findById(_req.params.userId);
            res.status(200).send(user);
        });
        return;
    }
    res.sendStatus(403);
});

export {router};
