import { IQuery } from '../../interfaces/query.interfaces';
import { IOrderProduct } from './interfaces/product.interface';
import { productRepository, ProductRepository } from './product.repository';
import { AppError } from '../../utils';
import { ISalesOrder, ISalesOrderProduct } from '../sales-order/interfaces/sales-order.interface';

export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  public async findAll(query: IQuery) {
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

  public async validateProducts(products: IOrderProduct[]) {
    const validProducts = await Promise.all(
      products.map((i: IOrderProduct) => this.findById(i.product)),
    );
    if (validProducts.includes(null)) throw new AppError('Bad request', 400);
  }
}

export const productService = new ProductService(productRepository);
