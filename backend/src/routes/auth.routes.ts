import { Request, Response,  NextFunction, Router } from 'express';
import { makeAuthController } from '../modules/auth/auth.factory';

const routes = Router();

routes.post('/login', (request: Request, response: Response, next: NextFunction) => {
    makeAuthController().login(request, response, next);
});
routes.post('/forgot-password', (request: Request, response: Response, next: NextFunction) => {
    makeAuthController().forgotPassword(request, response, next);
});
routes.post('/reset-password', (request: Request, response: Response, next: NextFunction) => {
    makeAuthController().resetPassword(request, response, next);
});

export default routes;
