import { IUser } from '../../interfaces/user.interfaces';
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

  async create(userData: IUser): Promise<any> {
    return this.create(userData);
  }

  async delete(id: string): Promise<void> {
    return this.userRepository.delete(id);
  }
}

export const userService = new UserService(userRepository);