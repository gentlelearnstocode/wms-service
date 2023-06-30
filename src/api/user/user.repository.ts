import UserModel from './user.model';
import { IUser } from '../../interfaces/user.interfaces';

export class UserRepository {
  public async findById(id: string) {
    const user = await UserModel.findById(id).populate('warehouse');
    return user;
  }

  public async findAll() {
    const users = await UserModel.find();
    return users;
  }

  public async findByEmail(email: string) {
    const user = await UserModel.findOne({ email }).select('+password');
    return user;
  }

  public async create(userData: IUser) {
    const newUser = await UserModel.create(userData);
    return newUser;
  }

  public async delete(id: string): Promise<void> {
    await UserModel.findByIdAndDelete(id);
  }
}

export const userRepository = new UserRepository();