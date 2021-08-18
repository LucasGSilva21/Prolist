import { Request, Response } from 'express';
import { ProductService } from './product.service';

class ProductController {
    constructor(private productService: ProductService) {}

    async findAll(request: Request, response: Response) {
        const products = await this.productService.findAll();

        return response.status(200).json(products);
    }

    async create(request: Request, response: Response) {
        const { name } = request.body;

        const product = await this.productService.create({ name });

        return response.status(201).json(product);
    }
}

export { ProductController };
