import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DiscountRepository } from 'src/database/repository';
import { CreateDiscountDto, DiscountDto } from 'src/infrastructure/dto';

@Injectable()
export class DiscountService {
    constructor(
        private readonly discountRepository: DiscountRepository,
    ) { }

    async create(discountInfo: CreateDiscountDto) {
        const result = await this.discountRepository.create(discountInfo);
        return result;
    }

    async findAll(): Promise<DiscountDto[]> {
        const result = await this.discountRepository.findAllActive();
        return plainToInstance(DiscountDto, result);
    }

    async deleteExpired() {
        const result = await this.discountRepository.findExpired();
        return result;
    }

}
