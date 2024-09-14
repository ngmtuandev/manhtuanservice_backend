import {
    Entity,
    Column,
    ManyToOne,
} from 'typeorm';
import { GenericEntity } from './generic.entity';
import { CartEntity } from './cart.entity';
import { ProductVarientEntity } from './product-varient.entity';

@Entity()
export class CartItemEntity extends GenericEntity {

    @Column()
    quantity: number;

    @Column()
    price: number;

    @ManyToOne(() => ProductVarientEntity)
    product: ProductVarientEntity;

    @ManyToOne(() => CartEntity, (cart) => cart.items)
    cart: CartEntity;

}
