import { Request, Response, Router } from 'express';
import { makeAuthController } from '../modules/auth/auth.factory';

const routes = Router();

routes.post('/login', (request: Request, response: Response) => {
    makeAuthController().login(request, response);
});
routes.post('/forgot-password', (request: Request, response: Response) => {
    makeAuthController().forgotPassword(request, response);
});

export default routes;
