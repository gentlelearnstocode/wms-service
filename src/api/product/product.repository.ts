import ProductModel from './product.model';
import { IQuery } from '../../interfaces/query.interfaces';

export class ProductRepository {
  public async findAll(query: IQuery) {
    const products = await ProductModel.find().skip(query.offset).limit(query.limit);
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
    await ProductModel.findByIdAndUpdate(id, data, {
      runValidators: true,
      new: true,
      returnDocument: 'after',
    });
  }

  public async delete(id: string) {
    await ProductModel.findByIdAndDelete(id);
  }
}

export const productRepository = new ProductRepository();
