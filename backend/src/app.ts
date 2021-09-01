import 'dotenv/config';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { routes } from './routes';
import createConnection from './database';

createConnection();

const app = express();

app.use(express.json());
app.use(cors());

app.use(routes);

app.use(
    (error: Error, req: Request, res: Response, next: NextFunction) => {
        return res.status(400).json({
            status: "Error",
            message: error.message,
        });
    }
);

export { app };
