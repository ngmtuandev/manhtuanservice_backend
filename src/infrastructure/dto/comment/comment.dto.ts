import { IsOptional } from 'class-validator';
import { ProductEntity, UserEntity } from 'src/database/entity';

export class CommentDto {
  @IsOptional()
  id: number;

  @IsOptional()
  text: string;

  @IsOptional()
  like: number;

  @IsOptional()
  parentId: number;

  @IsOptional()
  createdAt: any;

  @IsOptional()
  user: Partial<UserEntity>;

  @IsOptional()
  product: Partial<ProductEntity>;
}
