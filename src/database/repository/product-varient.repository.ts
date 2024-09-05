import { EntityTarget, Repository } from 'typeorm';
import { GenericRepository } from './generic.repository';
import { ProductVarientEntity } from '../entity';
import { CreateProductVarientDto } from 'src/infrastructure/dto';

export class ProductVarientRepository extends GenericRepository<ProductVarientEntity> {
    protected repository: Repository<ProductVarientEntity>;

    getEntityType(): EntityTarget<ProductVarientEntity> {
        return ProductVarientEntity;
    }

    async create(productVarientInfo: CreateProductVarientDto) {
        let result = undefined;
        const newProductVarient = await this.repository.save(productVarientInfo);
        if (newProductVarient) result = newProductVarient;
        return result;
    }

    async findOne(variantId: number) {
        const varientOfProduct = await this.repository.findOne({ where: { id: variantId } });
        return varientOfProduct;
    }

    async findAll(productId: any) {

        const result = await this.repository.find({ where: { product: { id: productId } }, select: ["name", "price", "color", "storage", "id"] });
        return result;
    }

}
