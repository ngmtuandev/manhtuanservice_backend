import { EntityTarget, Repository } from 'typeorm';
import { GenericRepository } from './generic.repository';
import { ServiceEntity } from '../entity';
import {
    CreateServiceDto,
} from 'src/infrastructure/dto';

export class ServiceRepository extends GenericRepository<ServiceEntity> {
    protected repository: Repository<ServiceEntity>;

    getEntityType(): EntityTarget<ServiceEntity> {
        return ServiceEntity;
    }

    async create(serviceInfo: CreateServiceDto) {
        const result = await this.repository.save(serviceInfo);
        return result;
    }

    async findAll() {
        const result = await this.repository.find();
        return result;
    }

    async delete(id: number) {
        const findService = await this.repository.findOneBy({ id });
        if (findService) {
            await this.repository.delete({ id });
            return true;
        }
        return false
    }

    async update(idService: number, serviceName: string) {
        const findService = await this.repository.findOneBy({ id: idService });
        if (findService) {
            const result = await this.repository.update(idService, {
                serviceName
            });
            if (result) return true;
            return false;
        }
        return false;
    }

}
