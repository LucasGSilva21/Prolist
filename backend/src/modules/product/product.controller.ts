import { Request, Response } from 'express';
import ProductService from './product.service';

class ProductController {
    async index(req: Request, res: Response) {
        const products = await ProductService.index();

        return res.json(products);
    }
}

export default new ProductController();
