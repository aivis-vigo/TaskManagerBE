import jwt from 'jsonwebtoken';
import {Response} from 'express';

export const verifyToken = async (
    token: string,
    secretKey: string,
    res: Response,
    callback: (authorizedData: any) => Promise<void>
): Promise<void> => {
    jwt.verify(token, secretKey, async (err, authorizedData) => {
        if (err) {
            res.sendStatus(403);
            return;
        }
        try {
            await callback(authorizedData);
        } catch (e) {
            console.error('Error processing request:', e);
            res.sendStatus(500);
        }
    })
};