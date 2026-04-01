import type { User } from "../../core/entities/User";


export class UserMapper {
    // Transforma la respuesta cruda de la API a nuestra Entidad segura
    static toDomain(raw: any): User {
        return {
            id: raw.id,
            name: raw.name,
            email: raw.email,
            avatar: raw.avatar,
            role: raw.role || 'customer' // Valor por defecto por seguridad
        };
    }
}