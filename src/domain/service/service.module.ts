import { Module } from '@nestjs/common';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';
import { ServiceRepository } from 'src/database/repository';

@Module({
    controllers: [ServiceController],
    providers: [ServiceService, ServiceRepository],
    imports: [],
})
export class ServiceModule { }
