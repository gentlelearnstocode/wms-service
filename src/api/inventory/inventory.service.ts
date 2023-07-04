import { inventoryRepository, InventoryRepository } from './inventory.repository';
import { IInventory } from './interfaces/inventory.interface';
import { productService, ProductService } from '../product/product.service';
import { AppError } from '../../utils';

export class InventoryService {
  private readonly productService: ProductService = productService;

  constructor(private readonly inventoryRepository: InventoryRepository) {
  }

  public async findAll() {
    return this.inventoryRepository.findAll();
  }

  public async findById(id: string) {
    return this.inventoryRepository.findById(id);
  }

  public async upsert(data: IInventory) {
    const existedInventory = await this.inventoryRepository.findByProductId(data.productId);
    const existedProduct = await this.productService.findById(data.productId);
    if (!existedInventory.length && existedProduct) {
      return await this.inventoryRepository.upsert(data);
    } else {
      throw new AppError('Bad request', 400);
    }
  }

  public async delete(id: string) {
    return this.inventoryRepository.delete(id);
  }
}

export const inventoryService = new InventoryService(inventoryRepository);