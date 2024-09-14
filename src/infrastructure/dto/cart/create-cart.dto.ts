import { IsNotEmpty } from 'class-validator';
import { UserEntity } from 'src/database/entity';

export class CreateCartDto {
    @IsNotEmpty()
    user: UserEntity;
}
