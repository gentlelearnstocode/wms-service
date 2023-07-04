import { IUser } from './interfaces/user.interfaces';
import { userRepository, UserRepository } from './user.repository';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {
  }

  async findAll() {
    return this.userRepository.findAll();
  }

  async findById(id: string) {
    return this.userRepository.findById(id);
  }

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async delete(id: string): Promise<void> {
    return this.userRepository.delete(id);
  }

  public async upsert<T>(data: IUser<T>) {
    return this.userRepository.upsert(data);
  }
}

export const userService = new UserService(userRepository);