import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import './loadEnviornment';
import express, {Request, Response, NextFunction, Express} from "express";
import {router as tasksRouter} from './routes/tasks';
import {router as userRouter} from './routes/users';
import {router as authenticationRouter} from './routes/authenticaiton';
import cors from "cors";
import * as fs from "node:fs";
import * as https from "node:https";
import mongoose from "mongoose";

const app: Express = express();

mongoose.connect(process.env.ATLAS_URI as string)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

const key = fs.readFileSync(path.join(__dirname, '../certificates', 'key.pem'));
const cert = fs.readFileSync(path.join(__dirname, '../certificates', 'cert.pem'));

const httpsOptions = { key, cert };

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({
    origin: 'https://localhost:4200',
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/tasks', tasksRouter);
app.use('/users', userRouter);
app.use('/login', authenticationRouter);

// catch 404 and forward to error handler
app.use(function (_req: Request, _res: Response, next: NextFunction): void {
    next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction): void {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// HTTPS server
const httpsServer = https.createServer(httpsOptions, app);
httpsServer.listen(8000, () => {
    console.log('HTTPS Server running on https://localhost:8000');
});

module.exports = app;
