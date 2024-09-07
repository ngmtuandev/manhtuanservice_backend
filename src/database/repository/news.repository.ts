import { EntityTarget, Repository } from 'typeorm';
import { GenericRepository } from './generic.repository';
import { NewsEntity } from '../entity';
import { CreateNewsDto, PaginationInfinityDto } from 'src/infrastructure/dto';

export class NewsRepository extends GenericRepository<NewsEntity> {
    protected repository: Repository<NewsEntity>;

    getEntityType(): EntityTarget<NewsEntity> {
        return NewsEntity;
    }

    async create(newsInfo: CreateNewsDto) {

        const result = await this.repository.save(newsInfo);
        return result;
    }

    async findAll(paginationInfo: PaginationInfinityDto) {

        const [news, total] = await this.repository.findAndCount({
            skip: paginationInfo.nextPageToken,
            take: paginationInfo.limit + 1
        })

        if (news) return { news, total };
        return undefined;
    }

    async findOne(newsId: number) {

        let result = undefined;
        const findNew = await this.repository.findOne({ where: { id: newsId } });
        if (findNew) {
            result = findNew;
        }
        return result;
    }

    async deleteOne(newsId: number) {

        let result = false;
        const findNews = await this.repository.findOne({ where: { id: newsId } });
        if (findNews) {
            await this.repository.delete({ id: newsId });
            result = true;
        }
        return result;
    }
}
