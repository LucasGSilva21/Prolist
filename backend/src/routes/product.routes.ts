import { Router } from 'express';
import ProductController from '../modules/product/product.controller';
import { ensureAuthenticated } from '../common/middlewares/ensure-auth.middleware';

const route = Router();

route.get('/', ProductController.index);
route.post('/', ensureAuthenticated, ProductController.create);

export default route;
