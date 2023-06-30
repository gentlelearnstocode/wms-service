import { supplierRepository, SupplierRepository } from './supplier.repository';

export class SupplierService {
  constructor(private readonly supplierRepository: SupplierRepository) {
  }

  async findById(id: string) {
    return this.supplierRepository.findById(id);
  }

  async findAll() {
    return this.supplierRepository.findAll();
  }

  async create(data: any) {
    return this.supplierRepository.create(data);
  }
}

export const supplierService = new SupplierService(supplierRepository);