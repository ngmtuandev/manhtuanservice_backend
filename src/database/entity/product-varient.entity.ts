import {
    Entity,
    Column,
    ManyToOne,
} from 'typeorm';
import { GenericEntity } from './generic.entity';
import { ProductEntity } from './product.entity';

@Entity()
export class ProductVarientEntity extends GenericEntity {
    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'price' })
    price: number;

    @Column({ name: 'storage' })
    storage: number;

    @Column({ name: 'color' })
    color: string;

    @Column({ name: 'images', type: 'text', array: true, nullable: true })
    images: string[];

    @ManyToOne(() => ProductEntity, (product) => product.productVarient, { nullable: true })
    product: ProductEntity;

}
