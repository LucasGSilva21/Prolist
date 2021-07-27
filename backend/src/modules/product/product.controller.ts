import { Request, Response } from 'express';
import ProductService from './product.service';

class ProductController {
    async index(request: Request, response: Response) {
        const products = await ProductService.index();

        return response.status(200).json(products);
    }

    async create(request: Request, response: Response) {
        const { name } = request.body;

        const product = await ProductService.create({ name });

        return response.status(201).json(product);
    }
}

export default new ProductController();
