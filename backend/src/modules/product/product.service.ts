import { ProductRepository } from './product.repository';

interface ICreateProductRequest {
    name: string;
}

class ProductService {
    constructor(private productRepository: ProductRepository) {}

    async findOne(productId: string) {
        const product = await this.productRepository.findOne({
            id: productId
        });

        return product;
    }

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
