import { Request, Response, NextFunction, Router } from 'express';
import { makeUserController } from '../modules/user/user.factory';

const routes = Router();

routes.post('/', (request: Request, response: Response, next: NextFunction) => {
    makeUserController().create(request, response, next);
});

export default routes;
