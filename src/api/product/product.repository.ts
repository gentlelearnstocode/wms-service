import ProductModel from './product.model';
import { IProductQuery } from '../../interfaces/query.interfaces';
import { buildAggregationPipelines } from '../../utils';

export class ProductRepository {
  public async findAll(query: IProductQuery) {
    const products = await ProductModel.aggregate(buildAggregationPipelines(query));
    return products;
  }

  public async findById(id: string) {
    const product = await ProductModel.findById(id);
    return product;
  }

  public async create(data: any) {
    const product = await ProductModel.create(data);
    return product;
  }

  public async findByIdAndUpdate(id: string, data: any) {
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, data, { runValidators: true, new: true });
    return updatedProduct;
  }

  public async delete(id: string) {
    await ProductModel.findByIdAndDelete(id);
  }
}

export const productRepository = new ProductRepository();