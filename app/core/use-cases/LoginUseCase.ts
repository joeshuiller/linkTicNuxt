import type { IAuthRepository } from '../interfaces/IAuthRepository';
import type { AuthToken } from '../entities/AuthToken';
import type { LoginDTO } from '../../infrastructure/Dtos/LoginDTO';

export class LoginUseCase {
    constructor(private readonly authRepository: IAuthRepository) { }

    async execute(credentials: LoginDTO): Promise<AuthToken> {
        if (!credentials.email || !credentials.password) {
            throw new Error('El email y la contraseña son obligatorios.');
        }
        return await this.authRepository.login(credentials);
    }
}