import {
  Entity,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { GenericEntity } from './generic.entity';
import { ROLE_CODE } from 'src/infrastructure/enum';
import { CommentEntity } from './comment.entity';
import { CartEntity } from './cart.entity';

@Entity()
export class UserEntity extends GenericEntity {
  @Column({ name: 'user_name' })
  userName: string;

  @Column({ default: ROLE_CODE.Client })
  role: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  password: string;

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comment: CommentEntity;

  @OneToOne(() => CartEntity, (cart) => cart.user)
  cart: CartEntity;

}
