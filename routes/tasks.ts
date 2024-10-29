import connectDB from "../db/conn";
import {Collection, Db, WithId} from "mongodb";
import express, {Request, Response, NextFunction} from "express";

const router = express.Router();

router.get('/', async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const db: Db = await connectDB();
        const collection: Collection<Document> = db.collection('todo-application');
        const results: WithId<Document>[] = await collection.find({})
            .limit(10)
            .toArray();

        res.status(200).send(results);
    } catch (e) {
        console.error('Error fetching data:', e);
        res.send('Server Error').status(500);
    }
});

export {router};
