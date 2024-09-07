import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CommentEntity } from 'src/database/entity';
import {
  UserRepository,
} from 'src/database/repository';
import { CommentRepository } from 'src/database/repository/comment.repository';
import { ProductRepository } from 'src/database/repository/product.repository';
import {
  CommentDto,
  CreateCommentDto,
  FindCommentDto,
  UpdateCommentDto,
} from 'src/infrastructure/dto';
import { DataSource, QueryRunner } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly userRepository: UserRepository,
    private readonly productRepository: ProductRepository,
    private readonly dataSource: DataSource,
  ) { }

  async create(commentInfo: CreateCommentDto, req: any) {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await this.userRepository.findUserById(req.userInfo.sub);
      if (!user) {
        throw new BadRequestException('User not found');
      }

      const product = await this.productRepository.findOne(
        commentInfo.product,
      );
      if (!product) {
        throw new BadRequestException('Post not found');
      }

      const parentId = commentInfo?.parentId || 0;

      const newComment = queryRunner.manager.create(CommentEntity, {
        ...commentInfo,
        parentId,
        user,
        product,
      });

      const result = await this.commentRepository.create(
        queryRunner.manager,
        newComment,
      );

      const findComment =
        await this.commentRepository.findCommentById(parentId);

      if (
        parentId !== 0 &&
        findComment &&
        findComment.user.id != req.userInfo.sub
      ) {
      }

      await queryRunner.commitTransaction();

      const resultConvertDto = this.toCommentDto(result);
      return resultConvertDto;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('Failed to create comment');
    } finally {
      await queryRunner.release();
    }
  }

  async findCommentOfPost(findCommentInfo: FindCommentDto) {
    const result = await this.commentRepository.findCommentOfPost(
      findCommentInfo?.productId,
      findCommentInfo?.parentId,
    );
    return result;
  }

  toCommentDto(comment: CommentEntity): CommentDto {
    return {
      id: comment.id,
      text: comment.text,
      like: comment.like,
      parentId: comment.parentId,
      createdAt: comment.createdAt,
      user: {
        id: comment.user.id,
        userName: comment.user.userName,
      },
      product: {
        id: comment.product.id,
      },
    };
  }

  async likeCommentById(commentId: number) {
    const response = await this.commentRepository.likeCommentById(commentId);
    return response;
  }

  async deleteById(commentId: number) {
    const result = await this.commentRepository.deleteRecursive(commentId);
    return result;
  }

  async updateById(updateCommentInfo: UpdateCommentDto, req: any) {
    const dataUpdate = { ...updateCommentInfo, userId: req.userInfo.sub };
    const result = await this.commentRepository.updateCommentById(dataUpdate);
    return result;
  }
}
