import type { IAuthRepository } from '../interfaces/IAuthRepository';
import type { User } from '../entities/User';

export class GetProfileUseCase {
    constructor(private readonly authRepository: IAuthRepository) { }

    async execute(token: string): Promise<User> {
        if (!token) {
            throw new Error('No se proporcionó un token de acceso.');
        }

        return await this.authRepository.getProfile(token);
    }
}