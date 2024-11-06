import express, {Request, Response, NextFunction} from "express";
import {Task} from "../models/task";

const router = express.Router();

router.get('/', async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const results = await Task.find({}).limit(10);
        res.status(200).send(results);
    } catch (e) {
        console.error('Error fetching data:', e);
        res.send('Server Error').status(500);
    }
});

router.get('/:taskId', async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const taskId = _req.params.taskId;
        const results = await Task.findOne({_id: taskId});
        res.status(200).send(results);
    } catch (e) {
        console.error('Error fetching data:', e);
        res.send('Server Error').status(500);
    }
});

router.post('/', async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const task = await Task.create(_req.body);
        res.status(201).send(task);
    } catch (e) {
        console.error('Error adding data to the database:', e);
    }
});

router.put('/update/:taskId', async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await Task.findByIdAndUpdate({_id: _req.params.taskId}, _req.body);
        const task = await Task.findById(_req.params.taskId);
        res.status(200).send(task);
    } catch (e) {
        console.error('Error updating the task:', e);
    }
});

router.delete('/:taskId', async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await Task.deleteOne({_id: _req.params.taskId});
        const updatedTasks = await Task.find();
        res.status(200).send(updatedTasks);
    } catch (e) {
        console.error('Error deleting data from the database:', e);
        res.status(500);
    }
});

export {router};
