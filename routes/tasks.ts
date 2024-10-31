import express, {Request, Response, NextFunction} from "express";
import mongoose, {Schema} from "mongoose";

mongoose.connect(process.env.ATLAS_URI as string)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

const taskSchema: Schema = new Schema({
    id: Number,
    title: String,
    description: String,
    type: String,
    createdOn: String,
    status: String
});

const Task = mongoose.model('Task', taskSchema, 'todo-application');
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

router.post('/', async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!Array.isArray(_req.body) || _req.body.length === 0) {
            res.status(400).json({ error: 'Invalid data format. Expecting an array of tasks.' });
        }

        await Task.insertMany(_req.body);
    } catch (e) {
        console.error('Error adding data to the database:', e);
    }
});

export {router};
