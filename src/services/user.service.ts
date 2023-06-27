import { IUser } from "../interfaces/user.interfaces";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
  constructor(private readonly userRepository: UserRepository) { }
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
}