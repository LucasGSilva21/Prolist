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

    @Column({
        name: 'password_reset_token',
        nullable: true
    })
    passwordResetToken: string;

    @Column({
        name: 'password_reset_expires',
        nullable: true
    })
    passwordResetExpires: Date;
}
  
export { UserEntity };
