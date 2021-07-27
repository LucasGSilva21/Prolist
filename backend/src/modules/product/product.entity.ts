import {
    Entity,
    Column,
} from 'typeorm';
import { BaseEntity } from '../../common/base/base.entity';
  
@Entity('products')
class ProductEntity extends BaseEntity {
    @Column()
    name: string;
}
  
export { ProductEntity };
