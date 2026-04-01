import type { AuthToken } from '../entities/AuthToken';
import type { LoginDTO } from '../../infrastructure/Dtos/LoginDTO';
import type { User } from '../entities/User';

export interface IAuthRepository {
    login(credentials: LoginDTO): Promise<AuthToken>;
    getProfile(token: string): Promise<User>;
}