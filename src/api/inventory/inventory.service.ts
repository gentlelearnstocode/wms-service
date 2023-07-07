import { inventoryRepository, InventoryRepository } from './inventory.repository';
import { IInventory } from './interfaces/inventory.interface';
import { productService, ProductService } from '../product/product.service';
import { AppError } from '../../utils';

export class InventoryService {
  private readonly productService: ProductService = productService;

  constructor(private readonly inventoryRepository: InventoryRepository) {}

  public async findAll() {
    return this.inventoryRepository.findAll();
  }

  public async findById(id: string) {
    return this.inventoryRepository.findById(id);
  }

  public async upsert(data: IInventory) {
    const existedInventory = await this.findByProductId(data.productId);
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

  public async findByProductId(productId: string) {
    return this.inventoryRepository.findByProductId(productId);
  }

  public async adjustOutgoingQuantity(productId: string, quantity: number) {
    const product = await this.productService.findById(productId);
    if (product) {
      await this.inventoryRepository.findOneAndUpdate(
        { productId },
        { $inc: { outgoingQuantity: quantity } },
      );
    }
  }

  public async adjustIncomingQuantity(productId: string, quantity: number) {
    if (await this.productService.findById(productId)) {
      await this.inventoryRepository.findOneAndUpdate(
        { productId },
        { $inc: { incomingQuantity: quantity } },
      );
    }
  }
}

export const inventoryService = new InventoryService(inventoryRepository);
