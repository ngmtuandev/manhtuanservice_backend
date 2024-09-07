import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import {
  UserRepository,
} from 'src/database/repository';
import { CommentService } from './comment.service';
import { CommentRepository } from 'src/database/repository/comment.repository';
import { ProductRepository } from 'src/database/repository/product.repository';

@Module({
  providers: [
    CommentRepository,
    CommentService,
    UserRepository,
    ProductRepository,
  ],
  controllers: [CommentController],
  exports: [],
  imports: [],
})
export class CommentModule { }
