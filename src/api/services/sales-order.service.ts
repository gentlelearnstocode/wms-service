import { SalesOrderRepository } from '../repositories/sales-order.repository';
import { getIncrementValue } from '../../utils';

export class SalesOrderService {
  private readonly getIncrementValue = getIncrementValue;
  constructor(private readonly salesOrderRepository: SalesOrderRepository) {}
  public async findAll() {
    return this.salesOrderRepository.findAll();
  }

  public async findById(id: string) {
    return this.salesOrderRepository.findById(id);
  }

  public async create(data: any) {
    const SONumber = await this.getIncrementValue('SONumber');
    data = {
      ...data,
      SONumber,
    };
    return this.salesOrderRepository.create(data);
  }

  public async delete(id: string) {
    return this.salesOrderRepository.delete(id);
  }
}
