import UserModel from './user.model';
import { IUser } from './interfaces/user.interfaces';

export class UserRepository {
  public async findById(id: string) {
    return UserModel.findById(id);
  }

  public async findAll() {
    return UserModel.find({}, null, {
      populate: {
        path: 'warehouses.warehouseInfo',
      },
    });
  }

  public async findByEmail(email: string) {
    return UserModel.findOne({ email }).select('+password');
  }

  public async delete(id: string): Promise<void> {
    await UserModel.findByIdAndDelete(id);
  }

  public async upsert<T>(data: IUser<T>) {
    return UserModel.findOneAndUpdate({ email: data.email }, data, {
      upsert: true,
      new: true,
    });
  }
}

export const userRepository = new UserRepository();
