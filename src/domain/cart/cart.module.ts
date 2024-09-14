import { Module } from '@nestjs/common';

import { CartItemRepository, CartRepository } from 'src/database/repository';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
    controllers: [CartController],
    providers: [CartService, CartRepository, CartItemRepository],
    imports: [],
})
export class CartModule { }
