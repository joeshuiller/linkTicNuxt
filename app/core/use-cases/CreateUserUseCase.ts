import type { IUserRepository } from '../interfaces/IUserRepository';
import type { User } from '../entities/User';
import type { CreateUserDTO } from '../../infrastructure/Dtos/CreateUserDTO';

export class CreateUserUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async execute(userData: CreateUserDTO): Promise<User> {
        return await this.userRepository.create(userData);
    }
}