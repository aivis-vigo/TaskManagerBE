import express, {Response, NextFunction} from "express";
import {Task} from "../models/task";
import ICustomRequest from "../models/custom-request";
import {checkToken} from "../middleware/checkToken";
import {verifyToken} from "../util/verifyToken";

const router = express.Router();

router.get('/', checkToken, async (_req: ICustomRequest, res: Response): Promise<void> => {
    if (_req.token) {
        await verifyToken(_req.token, process.env.SECRET_KEY as string, res, async () => {
            const results = await Task.find({});
            res.status(200).send(results); // No return statement
        });
        return;
    }
    res.sendStatus(403);
});

router.get('/:taskId', checkToken, async (_req: ICustomRequest, res: Response): Promise<void> => {
    if (_req.token) {
        await verifyToken(_req.token, process.env.SECRET_KEY as string, res, async () => {
            const taskId = _req.params.taskId;
            const result = await Task.findOne({_id: taskId});
            res.status(200).send(result);
        });
        return;
    }
    res.sendStatus(403);
});

router.post('/', checkToken, async (_req: ICustomRequest, res: Response, next: NextFunction): Promise<void> => {
    if (_req.token) {
        await verifyToken(_req.token, process.env.SECRET_KEY as string, res, async () => {
            const task = await Task.create(_req.body);
            res.status(201).send(task);
        });
        return;
    }
    res.sendStatus(403);
});

router.put('/update/:taskId', checkToken, async (_req: ICustomRequest, res: Response, next: NextFunction): Promise<void> => {
    if (_req.token) {
        await verifyToken(_req.token, process.env.SECRET_KEY as string, res, async () => {
            await Task.findByIdAndUpdate({_id: _req.params.taskId}, _req.body);
            const task = await Task.findById(_req.params.taskId);
            res.status(200).send(task);
        });
        return;
    }
    res.sendStatus(403);
});

router.delete('/:taskId', checkToken, async (_req: ICustomRequest, res: Response, next: NextFunction): Promise<void> => {
    if (_req.token) {
        await verifyToken(_req.token, process.env.SECRET_KEY as string, res, async () => {
            await Task.deleteOne({_id: _req.params.taskId});
            const updatedTasks = await Task.find();
            res.status(200).send(updatedTasks);
        });
        return;
    }
    res.sendStatus(403);
});

export {router};
