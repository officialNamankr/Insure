import express, {Request, Response, NextFunction} from 'express';
import "express-async-errors";
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import {InversifyExpressServer} from "inversify-express-utils";
import "./controllers/user.controller";
import container from './container';
import { currentUser, errorHandler, NotFoundError } from '@insureit/common';

const app = express();
app.set('trust proxy', 1);
app.use(json());
app.use(cookieSession({
  signed: false, 
  secure: true
}));
const coresOptions = {
    origin: 'https://insure.com',
    optionsSuccessStatus: 200
}
app.use(cors(coresOptions));
app.use(helmet()); 
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after 15 minutes"
}));
app.use((req,res,next)=>{currentUser(req,res,next)});
const server = new InversifyExpressServer(container, null, {rootPath: "/api"}, app);

let configuedApp = server.build();
configuedApp.all('*', (req: Request, res: Response, next: NextFunction) => {
    throw new NotFoundError("Route not found");;
});

configuedApp.use((err:Error,req: Request, res: Response, next: NextFunction) => {
    errorHandler(err,req,res,next);
});

export {app, configuedApp};