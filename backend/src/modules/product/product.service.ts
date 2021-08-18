import { ProductRepository } from './product.repository';

interface ICreateProductRequest {
    name: string;
}

class ProductService {
    constructor(private productRepository: ProductRepository) {}

    async findAll() {
        const products = await this.productRepository.find();

        return products;
    }

    async create({ name }: ICreateProductRequest) {
        const productCreate = this.productRepository.create({ name });

        await this.productRepository.save(productCreate);

        return productCreate;
    }
}

export { ProductService };
