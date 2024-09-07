import { IsNotEmpty } from 'class-validator';

export class FindCommentDto {
  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  parentId: number;

}
