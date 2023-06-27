import { UserModel } from "../models"
import { IUser } from "../interfaces/user.interfaces"

export class UserRepository{
  async findById(id: string){
    const user = await UserModel.findById(id).populate('warehouse')
    return user
  }

  async findAll(){
    const users = await UserModel.find()
    return users
  }

  async findByEmail(email: string){
    const user = await UserModel.findOne({email}).select('+password')
    return user
  }

  async create(userData: IUser) {
    const newUser = await UserModel.create(userData)
    return newUser
  }

}