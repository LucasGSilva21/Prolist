import { Request, Response, NextFunction, Router } from 'express';
import { makeProductController } from '../modules/product/product.factory';

const route = Router();

route.get('/:id', (request: Request, response: Response, next: NextFunction) => {
    makeProductController().findOne(request, response, next);
});
route.get('/', (request: Request, response: Response, next: NextFunction) => {
    makeProductController().findAll(request, response, next);
});
route.post('/', (request: Request, response: Response, next: NextFunction) => {
    makeProductController().create(request, response, next);
});

export default route;
