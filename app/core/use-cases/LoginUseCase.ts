import type { IAuthRepository } from '../interfaces/IAuthRepository';
import type { AuthToken } from '../entities/AuthToken';
import type { LoginDTO } from '../../infrastructure/Dtos/LoginDTO';

export class LoginUseCase {
    constructor(private readonly authRepository: IAuthRepository) { }

    async execute(credentials: LoginDTO): Promise<AuthToken> {
        return await this.authRepository.login(credentials);
    }
}