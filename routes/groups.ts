import express, {NextFunction, Response} from "express";
import {checkToken} from "../middleware/checkToken";
import ICustomRequest from "../models/custom-request";
import {verifyToken} from "../util/verifyToken";
import {Group} from "../models/group";

const router = express.Router();

router.get('/', checkToken, async (_req: ICustomRequest, res: Response): Promise<void> => {
    if (_req.token) {
        await verifyToken(_req.token, process.env.SECRET_KEY as string, res, async () => {
            const results = await Group.find({});
            res.status(200).send(results);
        });
        return;
    }
    res.sendStatus(403);
});

router.get('/:groupId', checkToken, async (_req: ICustomRequest, res: Response): Promise<void> => {
    if (_req.token) {
        await verifyToken(_req.token, process.env.SECRET_KEY as string, res, async () => {
            const groupId = _req.params.groupId;
            const result = await Group.findOne({_id: groupId});
            res.status(200).send(result);
        });
        return;
    }
    res.sendStatus(403);
});

router.post('/create', checkToken, async (_req: ICustomRequest, res: Response, next: NextFunction): Promise<void> => {
    if (_req.token) {
        await verifyToken(_req.token, process.env.SECRET_KEY as string, res, async () => {
            const results = await Group.create(_req.body);
            res.send(results);
        })
        return;
    }
    res.sendStatus(403);
});

router.put('/update/:groupId', checkToken, async (_req: ICustomRequest, res: Response, next: NextFunction): Promise<void> => {
    if (_req.token) {
        await verifyToken(_req.token, process.env.SECRET_KEY as string, res, async () => {
            await Group.findByIdAndUpdate({_id: _req.params.groupId}, _req.body);
            const group = await Group.findById(_req.params.groupId);
            res.status(200).send(group);
        });
        return;
    }
    res.sendStatus(403);
});

router.delete('/:groupId', checkToken, async (_req: ICustomRequest, res: Response, next: NextFunction): Promise<void> => {
    if (_req.token) {
        await verifyToken(_req.token, process.env.SECRET_KEY as string, res, async () => {
            await Group.deleteOne({_id: _req.params.groupId});
            const updatedGroups = await Group.find();
            res.status(200).send(updatedGroups);
        });
        return;
    }
    res.sendStatus(403);
});

export {router};
