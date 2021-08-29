import { Request, Response, Router } from 'express';
import { makeUserController } from '../modules/user/user.factory';

const routes = Router();

routes.post('/', (request: Request, response: Response) => {
    makeUserController().create(request, response);
});

export default routes;
