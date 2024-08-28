import {
    Entity,
    Column,
    OneToOne,
    JoinColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { GenericEntity } from './generic.entity';
import { BrandEntity } from './brand.entity';
import { ServiceEntity } from './service.entity';
import { DiscountEntity } from './discount.entity';

@Entity()
export class ProductEntity extends GenericEntity {
    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'info' })
    info: string;

    @Column({ name: 'description' })
    description: string;

    @OneToOne(() => BrandEntity)
    @JoinColumn()
    brand: BrandEntity;

    @ManyToOne(() => ServiceEntity, (service) => service.products)
    service: ServiceEntity;

    @OneToMany(() => DiscountEntity, (discount) => discount.product, { cascade: true })
    discounts: DiscountEntity[];

}
