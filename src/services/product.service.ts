import { ProductRepository } from "../repositories/product.repository";

export class ProductService {
  constructor(private readonly productRepository: ProductRepository){}
  async findAll(){
    return this.productRepository.findAll()
  }

  async findById(id: string){
    return this.productRepository.findById(id)
  }

  async create(data: any){
    return this.productRepository.create(data)
  }

  async findByIdAndUpdate(id: string, data: any){
    return this.productRepository.findByIdAndUpdate(id, data)
  }
}