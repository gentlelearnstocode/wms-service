import { IProductQuery } from '../../interfaces/query.interfaces';
import { ProductRepository } from '../repositories/product.repository';

export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {
  }

  public async findAll(query: IProductQuery) {
    return this.productRepository.findAll(query);
  }

  public async findById(id: string) {
    return this.productRepository.findById(id);
  }

  public async create(data: any) {
    return this.productRepository.create(data);
  }

  public async findByIdAndUpdate(id: string, data: any) {
    return this.productRepository.findByIdAndUpdate(id, data);
  }

  public async delete(id: string) {
    return this.productRepository.delete(id);
  }
}
