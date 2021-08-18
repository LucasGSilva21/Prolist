import { Request, Response, Router } from 'express';
import { userFactory } from '../modules/user/user.factory';

const routes = Router();

routes.post('/', (request: Request, response: Response) => {
    userFactory().create(request, response);
});

export default routes;
