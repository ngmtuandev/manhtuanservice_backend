import {
    Entity,
    Column,
} from 'typeorm';
import { GenericEntity } from './generic.entity';

@Entity()
export class NewsEntity extends GenericEntity {
    @Column({ name: 'view' })
    view: number;

    @Column({ name: 'title' })
    title: string;

    @Column({ name: 'thumbnail' })
    thumbnail: string;

    @Column({ name: 'content' })
    content: string;

    @Column({ name: 'like' })
    like: number;
}
