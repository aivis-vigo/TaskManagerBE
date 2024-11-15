import express, {NextFunction, Request, Response} from "express";
import {User} from "../models/user";
import jwt from "jsonwebtoken";
import {Role} from "../models/role";

export const router = express.Router();

router.post('/', async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userExists = await User.findOne({
            username: _req.body.username
        });


        if (userExists) {
            res.status(409).send({message: 'Account with this username already exists!'});
        }

        const defaultRole = await Role.findOne({name: 'User'});

        if (defaultRole) {
            const user = await User.create({
                ..._req.body,
                roles: [defaultRole.name]
            });

            jwt.sign({user}, process.env.SECRET_KEY as string, {expiresIn: '1h'}, (err, token) => {
                if (err) {
                    res.send({message: 'Token generation failed.'});
                }
                res.send({user, token});
            });
        } else {
            res.status(409).send({message: 'Role was not assigned!'});
        }
    } catch (e) {
        next(e);
    }
});