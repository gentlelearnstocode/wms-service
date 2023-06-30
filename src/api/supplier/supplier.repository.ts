import SupplierModel from './supplier.model';

export class SupplierRepository {
  async findById(id: string) {
    const supplier = await SupplierModel.findById(id);
    return supplier;
  }

  async findAll() {
    const suppliers = await SupplierModel.find();
    return suppliers;
  }

  async create(data: any): Promise<void> {
    await SupplierModel.create(data);
  }
}

export const supplierRepository = new SupplierRepository();