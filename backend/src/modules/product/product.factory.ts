import { getCustomRepository } from 'typeorm';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

export const productFactory = () => {
    const productRepository = getCustomRepository(ProductRepository);

    const productService = new ProductService(productRepository);

    const productController = new ProductController(productService);

    return productController;
}
