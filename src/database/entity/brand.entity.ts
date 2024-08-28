import {
    Entity,
    Column,
} from 'typeorm';
import { GenericEntity } from './generic.entity';

@Entity()
export class BrandEntity extends GenericEntity {
    @Column({ name: 'brand' })
    brand: string;

}
