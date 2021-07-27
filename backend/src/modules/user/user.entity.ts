import {
    Entity,
    Column,
} from 'typeorm';
import { BaseEntity } from '../../common/base/base.entity';
  
@Entity('users')
class UserEntity extends BaseEntity {
    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;
}
  
export { UserEntity };
