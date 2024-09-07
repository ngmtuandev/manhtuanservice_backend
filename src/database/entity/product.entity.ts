import {
    Entity,
    Column,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { GenericEntity } from './generic.entity';
import { BrandEntity } from './brand.entity';
import { ServiceEntity } from './service.entity';
import { DiscountEntity } from './discount.entity';
import { ProductVarientEntity } from './product-varient.entity';
import { CommentEntity } from './comment.entity';

@Entity()
export class ProductEntity extends GenericEntity {
    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'info' })
    info: string;

    @Column({ name: 'thubnail', type: 'text', nullable: true })
    thumbnail: string;

    @Column({ name: 'description' })
    description: string;

    @ManyToOne(() => BrandEntity, (brand) => brand.product)
    brand: BrandEntity;

    @ManyToOne(() => ServiceEntity, (service) => service.products)
    service: ServiceEntity;

    @OneToMany(() => DiscountEntity, (discount) => discount.product, { cascade: true })
    discounts: DiscountEntity;

    @OneToMany(() => ProductVarientEntity, (productVarient) => productVarient.product)
    productVarient: ProductVarientEntity[];

    @OneToMany(() => CommentEntity, (comment) => comment.product)
    comment: CommentEntity;

}
