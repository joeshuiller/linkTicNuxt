import { $fetch } from 'ofetch';
import type { IAuthRepository } from '../../core/interfaces/IAuthRepository';
import type { LoginDTO } from '../../infrastructure/Dtos/LoginDTO';
import type { AuthToken } from '../../core/entities/AuthToken';
import { API_URLS } from '../../shared/urlList';
import type { User } from '~~/app/core/entities/User';
import { UserMapper } from '../mappers/UserMapper';

export class ApiAuthRepository implements IAuthRepository {
    async getProfile(token: string): Promise<User> {
        try {
            const response = await $fetch<User>(API_URLS.getAuthProfile(), {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return UserMapper.toDomain(response);
        } catch (error: any) {
            console.error('Error en el repositorio de Auth:', error);
            throw new Error('Error al obtener el perfil.');
        }
    }
    async login(credentials: LoginDTO): Promise<AuthToken> {
        try {
            // Hacemos la petición a la API
            const response = await $fetch<{ access_token: string; refresh_token: string }>(API_URLS.getAuthLogin(), {
                method: 'POST',
                body: credentials
            });

            // ¡El Mapper integrado! 
            // Transformamos el 'access_token' (snake_case de la API) a 'accessToken' (camelCase de nuestra Entidad)
            return {
                accessToken: response.access_token,
                refreshToken: response.refresh_token
            };
        } catch (error: any) {
            console.error('Error en el repositorio de Auth:', error);
            // Ocultamos detalles técnicos de la API y lanzamos un error limpio para la UI
            throw new Error('Credenciales inválidas. Por favor, verifica tu correo y contraseña.');
        }
    }
}