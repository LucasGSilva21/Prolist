import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
  
@Entity('products')
class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    name: string;
  
    @CreateDateColumn({ select: false })
    created_at: Date;
  
    @UpdateDateColumn({ select: false })
    updated_at: Date;
}
  
export { ProductEntity };
