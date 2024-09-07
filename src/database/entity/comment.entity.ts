import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { GenericEntity } from './generic.entity';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserEntity } from './user.entity';
import { ProductEntity } from './product.entity';

@Entity()
export class CommentEntity extends GenericEntity {
  @Column({ name: 'text' })
  @IsNotEmpty()
  text: string;

  @Column({ name: 'like' })
  like: number | null = 0;

  @Column({ name: 'parent_id' })
  @IsOptional()
  parentId: number;

  @ManyToOne(() => UserEntity, (user) => user.comment)
  user: UserEntity;

  @ManyToOne(() => ProductEntity, (product) => product.comment)
  product: ProductEntity;

}
