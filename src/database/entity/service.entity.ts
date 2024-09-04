import {
    Entity,
    Column,
    OneToMany,
} from 'typeorm';
import { GenericEntity } from './generic.entity';
import { ProductEntity } from './product.entity';

@Entity()
export class ServiceEntity extends GenericEntity {
    @Column({ name: 'service_name' })
    serviceName: string;

    @Column({ name: 'url' })
    url: string;

    @OneToMany(() => ProductEntity, (product) => product.service)
    products: ProductEntity[];

}
