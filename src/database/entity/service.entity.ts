import {
    Entity,
    Column,
} from 'typeorm';
import { GenericEntity } from './generic.entity';

@Entity()
export class ServiceEntity extends GenericEntity {
    @Column({ name: 'service_name' })
    serviceName: string;

    @Column({ name: 'url' })
    url: string;

}
