import { Injectable } from '@nestjs/common';
import { IdDto } from 'src/common/dto';
import { ServiceRepository } from 'src/database/repository';
import { CreateServiceDto, LoginUserDto } from 'src/infrastructure/dto';

@Injectable()
export class ServiceService {
    constructor(
        private readonly serviceRepository: ServiceRepository,
    ) { }

    async create(serviceInfo: CreateServiceDto) {
        const result = await this.serviceRepository.create(serviceInfo);
        return result;
    }

    async findAll() {
        const result = await this.serviceRepository.findAll();
        return result;
    }

    async delete(id: IdDto) {
        const result = await this.serviceRepository.delete(id.id);
        return result;
    }

    async update(id: number, serviceName: string) {
        const result = await this.serviceRepository.update(id, serviceName);
        return result;
    }
}
