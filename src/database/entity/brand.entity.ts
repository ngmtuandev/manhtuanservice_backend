import {
    Entity,
    Column,
    OneToOne,
} from 'typeorm';
import { GenericEntity } from './generic.entity';
import { ProductEntity } from './product.entity';

@Entity()
export class BrandEntity extends GenericEntity {
    @Column({ name: 'brand' })
    brand: string;

    @OneToOne(() => ProductEntity, (product) => product.brand)
    product: ProductEntity;

}
