import { ProductModel } from "../models";

export class ProductRepository {
  async findAll(){
    const products = await ProductModel.find()
    return products
  }

  async findById(id: string){
    const product = await ProductModel.findById(id)
    return product
  }

  async create(data: any){
    const product = await ProductModel.create(data)
    return product
  }

  async findByIdAndUpdate(id: string, data: any){
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, data, {runValidators: true, new: true})
    return updatedProduct
  }
}