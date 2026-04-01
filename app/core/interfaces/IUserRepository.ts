import type { User } from '../entities/User';
import type { CreateUserDTO } from '../../infrastructure/Dtos/CreateUserDTO';

export interface IUserRepository {
    create(data: CreateUserDTO): Promise<User>;
}