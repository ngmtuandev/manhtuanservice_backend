import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
} from 'typeorm';
import { GenericEntity } from './generic.entity';
import { CartItemEntity } from './cart-item.entity';
import { UserEntity } from './user.entity';

@Entity()
export class CartEntity extends GenericEntity {

    @Column({ default: 0 })
    total: number;

    @OneToMany(() => CartItemEntity, (cartItem) => cartItem.cart, { cascade: true })
    items: CartItemEntity[];

    @OneToOne(() => UserEntity, (user) => user.cart)
    @JoinColumn()
    user: UserEntity;

}
