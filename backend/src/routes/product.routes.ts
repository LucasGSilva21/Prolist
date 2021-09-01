import { Request, Response, NextFunction, Router } from 'express';
import { makeProductController } from '../modules/product/product.factory';
import { ensureAuthenticated } from '../common/middlewares/ensure-auth.middleware';

const route = Router();

route.get('/', (request: Request, response: Response, next: NextFunction) => {
    makeProductController().findAll(request, response, next);
});
route.post('/', ensureAuthenticated, (request: Request, response: Response, next: NextFunction) => {
    makeProductController().create(request, response, next);
});

export default route;
