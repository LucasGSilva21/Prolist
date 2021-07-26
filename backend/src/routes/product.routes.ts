import { Router } from 'express';
import ProductController from '../modules/product/product.controller';

const route = Router();

route.get('/', ProductController.index);

export default route;
