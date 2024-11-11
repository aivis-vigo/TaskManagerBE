import express, {Request, Response, NextFunction} from "express";
import {Task} from "../models/task";
import jwt from "jsonwebtoken";
import ICustomRequest from "../models/custom-request";
import {checkToken} from "../middleware/checkToken";

const router = express.Router();

router.get('/', checkToken, async (_req: ICustomRequest, res: Response, next: NextFunction): Promise<void> => {
    if (_req.token) {
        jwt.verify(_req.token, process.env.SECRET_KEY as string, async (err, auhtorizedData) => {
            if (err) {
                res.status(403);
            }
            try {
                const results = await Task.find({});
                res.status(200).send(results);
            } catch (e) {
                console.error('Error fetching data:', e);
                res.status(500);
            }
        })
    }
    res.status(403);
});

router.get('/:taskId', checkToken, async (_req: ICustomRequest, res: Response, next: NextFunction): Promise<void> => {
    if (_req.token) {
        jwt.verify(_req.token, process.env.SECRET_KEY as string, async (err, auhtorizedData) => {
            if (err) {
                res.status(403);
            }
            try {
                const taskId = _req.params.taskId;
                const results = await Task.findOne({_id: taskId});
                res.status(200).send(results);
            } catch (e) {
                console.error('Error fetching data:', e);
                res.send('Server Error').status(500);
            }
        })
    }
    res.status(403);
});

router.post('/', checkToken, async (_req: ICustomRequest, res: Response, next: NextFunction): Promise<void> => {
    if (_req.token) {
        jwt.verify(_req.token, process.env.SECRET_KEY as string, async (err, auhtorizedData) => {
            if (err) {
                res.status(403);
            }
            try {
                const task = await Task.create(_req.body);
                res.status(201).send(task);
            } catch (e) {
                console.error('Error adding data to the database:', e);
            }
        })
    }
    res.status(403);
});

router.put('/update/:taskId', checkToken, async (_req: ICustomRequest, res: Response, next: NextFunction): Promise<void> => {
    if (_req.token) {
        jwt.verify(_req.token, process.env.SECRET_KEY as string, async (err, auhtorizedData) => {
            if (err) {
                res.status(403);
            }
            try {
                await Task.findByIdAndUpdate({_id: _req.params.taskId}, _req.body);
                const task = await Task.findById(_req.params.taskId);
                res.status(200).send(task);
            } catch (e) {
                console.error('Error updating the task:', e);
            }
        })
    }
    res.status(403);
});

router.delete('/:taskId', checkToken, async (_req: ICustomRequest, res: Response, next: NextFunction): Promise<void> => {
    if (_req.token) {
        jwt.verify(_req.token, process.env.SECRET_KEY as string, async (err, auhtorizedData) => {
            if (err) {
                res.status(403);
            }
            try {
                await Task.deleteOne({_id: _req.params.taskId});
                const updatedTasks = await Task.find();
                res.status(200).send(updatedTasks);
            } catch (e) {
                console.error('Error deleting data from the database:', e);
                res.status(500);
            }
        })
    }
    res.status(403);
});

export {router};
