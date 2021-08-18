import { Request, Response, Router } from 'express';
import { productFactory } from '../modules/product/product.factory';
import { ensureAuthenticated } from '../common/middlewares/ensure-auth.middleware';

const route = Router();

route.get('/', (request: Request, response: Response) => {
    productFactory().findAll(request, response);
});
route.post('/', ensureAuthenticated, (request: Request, response: Response) => {
    productFactory().create(request, response);
});

export default route;
