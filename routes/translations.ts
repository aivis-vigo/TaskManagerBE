import ICustomRequest from "../models/custom-request";
import express, {Response} from "express";
import {Translation} from "../models/translation";

const router = express.Router();

router.get('/:lang', async (_req: ICustomRequest, res: Response): Promise<void> => {
    const language = _req.params.lang;
    const result = await Translation.findOne({language: language});

    if (!result) {
        res.status(404).json({ error: `Translations for '${language}' not found.` });
    }

    res.status(200).send(result);
});

export {router};