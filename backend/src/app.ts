import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import acl from 'express-acl';
import { routes } from './routes';
import createConnection from './database';
import { validateResponseError } from './common/helpers/validate-response-error';
import { config, responseObject } from './common/config/acl';

createConnection();

const app = express();

app.use(express.json());
app.use(cors());

app.use(routes);
acl.config(config, responseObject);

app.use(validateResponseError);

export { app };
