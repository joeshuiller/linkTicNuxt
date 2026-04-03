import { describe, it, expect } from 'vitest';
import { UserMapper } from './UserMapper';
import type { User } from '../../core/entities/User';

describe('UserMapper', () => {

    // TEST 1: El Camino Feliz (El backend envía todos los datos)
    it('debe mapear correctamente los datos crudos a una entidad User cuando vienen completos', () => {
        // Arrange: Simulamos una respuesta perfecta de la API
        const rawAdmin = {
            id: 1,
            name: 'Carlos Admin',
            email: 'carlos@admin.com',
            avatar: 'https://ejemplo.com/avatar.jpg',
            role: 'admin'
        };

        // Act: Ejecutamos el mapper
        const result: User = UserMapper.toDomain(rawAdmin);

        // Assert: Comprobamos que todos los campos pasaron sin alterarse
        expect(result.id).toBe(rawAdmin.id);
        expect(result.name).toBe(rawAdmin.name);
        expect(result.email).toBe(rawAdmin.email);
        expect(result.avatar).toBe(rawAdmin.avatar);
        expect(result.role).toBe('admin'); // Respetó el rol que venía
    });

    // TEST 2: La regla de seguridad (Falta el rol)
    it('debe asignar el rol "customer" por defecto si el objeto crudo no incluye rol', () => {
        // Arrange: Simulamos que la API olvidó enviar el rol, o es un registro nuevo básico
        const rawIncomplete = {
            id: 2,
            name: 'Ana Cliente',
            email: 'ana@correo.com',
            avatar: 'https://ejemplo.com/ana.jpg'
            // Nota: No incluimos 'role'
        };

        // Act
        const result = UserMapper.toDomain(rawIncomplete);

        // Assert: Verificamos que la regla salvavidas funcionó
        expect(result.id).toBe(rawIncomplete.id);
        expect(result.role).toBe('customer'); // ¡Magia! El mapper lo protegió
    });

    // TEST 3: La regla de seguridad estricta (Rol null o vacío)
    it('debe asignar el rol "customer" si la API envía un rol nulo o vacío', () => {
        // Arrange: APIs mal diseñadas a veces mandan null o strings vacíos
        const rawCorrupt = {
            id: 3,
            name: 'Pedro Corrupto',
            email: 'pedro@correo.com',
            avatar: 'https://ejemplo.com/pedro.jpg',
            role: null // o también podría ser role: ''
        };

        // Act
        const result = UserMapper.toDomain(rawCorrupt);

        // Assert
        expect(result.role).toBe('customer');
    });
});