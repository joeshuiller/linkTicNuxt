import { $fetch } from 'ofetch';
import type { IUserRepository } from '../../core/interfaces/IUserRepository';
import type { User } from '../../core/entities/User';
import { UserMapper } from '../mappers/UserMapper';
import type { CreateUserDTO } from '../Dtos/CreateUserDTO';
import { API_URLS } from '../../shared/urlList';

export class ApiUserRepository implements IUserRepository {
    async create(data: CreateUserDTO): Promise<User> {
        try {
            const response = await $fetch(API_URLS.getUsers(), {
                method: 'POST',
                body: data
            });

            // Mapeamos el JSON de respuesta a nuestra Entidad
            return UserMapper.toDomain(response);
        } catch (error: any) {
            console.error('Error al crear usuario en la API:', error);
            // Aquí podrías capturar errores 400 (ej. email ya existe) y lanzar un error más amigable
            throw new Error(error.data?.message || 'Hubo un problema al registrar el usuario.');
        }
    }
}