import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BrandRepository } from 'src/database/repository';
import { BrandDto, CreateBrandDto } from 'src/infrastructure/dto';

@Injectable()
export class BrandService {
    constructor(
        private readonly brandRepository: BrandRepository,
    ) { }

    async create(brandInfo: CreateBrandDto) {
        const result = await this.brandRepository.create(brandInfo);
        return result;
    }

    async findAll(): Promise<BrandDto[]> {
        const result = await this.brandRepository.findAll();
        return plainToInstance(BrandDto, result);
    }

}
