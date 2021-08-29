import { getCustomRepository } from 'typeorm';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

const makeProductRepository = () => {
    return getCustomRepository(ProductRepository);
}

export const makeProductService = () => {
    const productRepository = makeProductRepository();

    return new ProductService(productRepository);
}

export const makeProductController = () => {
    const productService = makeProductService();

    return new ProductController(productService);
}
