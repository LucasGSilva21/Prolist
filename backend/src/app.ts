import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import { routes } from './routes';
import createConnection from './database';
import { validateResponseError } from './common/helpers/validate-response-error';

createConnection();

const app = express();

app.use(express.json());
app.use(cors());

app.use(routes);

app.use(validateResponseError);

export { app };
