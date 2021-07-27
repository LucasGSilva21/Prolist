import { EntityRepository, Repository } from 'typeorm';
import { ProductEntity } from './product.entity';

@EntityRepository(ProductEntity)
class ProductRepository extends Repository<ProductEntity> {}

export { ProductRepository };
