import {
    Entity,
    Column,
    OneToOne,
    ManyToOne,
} from 'typeorm';
import { GenericEntity } from './generic.entity';
import { ProductEntity } from './product.entity';

@Entity()
export class DiscountEntity extends GenericEntity {
    @Column()
    percentage: number;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @ManyToOne(() => ProductEntity, (product) => product.discounts, { nullable: true })
    product: ProductEntity;

}
