import { Request, Response, Router } from 'express';
import { authFactory } from '../modules/auth/auth.factory';

const routes = Router();

routes.post('/login', (request: Request, response: Response) => {
    authFactory().login(request, response);
});

export default routes;
