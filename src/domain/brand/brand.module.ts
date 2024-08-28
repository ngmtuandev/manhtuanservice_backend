import { Module } from '@nestjs/common';

import { BrandRepository } from 'src/database/repository';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';

@Module({
    controllers: [BrandController],
    providers: [BrandService, BrandRepository],
    imports: [],
})
export class BrandModule { }
