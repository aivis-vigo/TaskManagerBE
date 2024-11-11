import {NextFunction, Response} from "express";
import ICustomRequest from "../../models/custom-request";

export const checkToken = (req: ICustomRequest, res: Response, next: NextFunction) => {
    const header = req.headers['authorization'];

    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');

        req.token = bearer[1];
        next();
    } else {
        res.sendStatus(403);
    }
}