import { Request, Response, NextFunction } from 'express';
import { ProductService } from './product.service';

class ProductController {
    constructor(private productService: ProductService) {}

    async findOne(request: Request, response: Response, next: NextFunction) {
        try {
            const { id } = request.params;

            const product = await this.productService.findOne(id);

            return response.status(200).json(product);
        } catch (err) {
            return next(err);
        }
    }

    async findAll(request: Request, response: Response, next: NextFunction) {
        try {
            const products = await this.productService.findAll();

            return response.status(200).json(products);
        } catch (err) {
            return next(err);
        }
    }

    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const { name } = request.body;

            const product = await this.productService.create({ name });

            return response.status(201).json(product);
        } catch (err) {
            return next(err);
        }
    }
}

export { ProductController };
