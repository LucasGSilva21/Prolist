import { getCustomRepository } from 'typeorm';
import { ProductRepository } from './product.repository';

interface ICreateProductRequest {
    name: string;
}

class ProductService {
    async index() {
        const productRepository = getCustomRepository(ProductRepository);

        const products = await productRepository.find();

        return products;
    }

    async create({ name }: ICreateProductRequest) {
        const productRepository = getCustomRepository(ProductRepository);

        const productCreate = productRepository.create({ name });

        await productRepository.save(productCreate);

        return productCreate;
    }
}

export default new ProductService();
