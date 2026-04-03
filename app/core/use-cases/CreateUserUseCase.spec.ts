import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CreateUserUseCase } from './CreateUserUseCase'; // Ajusta la ruta si es necesario
import type { IUserRepository } from '../interfaces/IUserRepository';
import type { User } from '../entities/User';
import type { CreateUserDTO } from '../../infrastructure/Dtos/CreateUserDTO';

describe('CreateUserUseCase', () => {
    // Variables globales para nuestros tests
    let mockUserRepository: IUserRepository;
    let useCase: CreateUserUseCase;

    // Datos de prueba (Dummies)
    const mockDto: CreateUserDTO = {
        name: 'Juan Perez',
        email: 'juan@correo.com',
        password: 'password123',
        avatar: 'https://avatar.url/img.jpg'
    };

    const mockUser: User = {
        id: 1, // o string, dependiendo de tu entidad
        ...mockDto,
        role: 'customer',
        creationAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    // Se ejecuta ANTES de cada test (it) para darnos un entorno limpio
    beforeEach(() => {
        // 1. Creamos un mock del repositorio usando vi.fn() de Vitest
        mockUserRepository = {
            create: vi.fn(),
            // Si tu IUserRepository tiene más métodos (ej. findById), 
            // no necesitas mockearlos todos si este test no los usa, 
            // gracias a la aserción 'as unknown as IUserRepository'.
        } as unknown as IUserRepository;

        // 2. Instanciamos el Caso de Uso inyectando el repositorio simulado
        useCase = new CreateUserUseCase(mockUserRepository);
    });

    it('debe crear un usuario exitosamente cuando recibe un DTO válido', async () => {
        // Arrange (Preparar): Le decimos al mock qué debe responder cuando lo llamen
        vi.mocked(mockUserRepository.create).mockResolvedValue(mockUser);

        // Act (Actuar): Ejecutamos el método que queremos probar
        const result = await useCase.execute(mockDto);

        // Assert (Afirmar): Comprobamos que pasó lo que esperábamos
        expect(mockUserRepository.create).toHaveBeenCalledTimes(1);
        expect(mockUserRepository.create).toHaveBeenCalledWith(mockDto);
        expect(result).toEqual(mockUser);
    });

    it('debe lanzar un error si el repositorio falla al crear el usuario', async () => {
        // Arrange (Preparar): Simulamos un error en la base de datos o API
        const errorMessage = 'Error de conexión a la base de datos';
        vi.mocked(mockUserRepository.create).mockRejectedValue(new Error(errorMessage));

        // Act & Assert: Comprobamos que el caso de uso propaga el error
        await expect(useCase.execute(mockDto)).rejects.toThrow(errorMessage);

        // Verificamos que sí intentó llamar al repositorio antes de fallar
        expect(mockUserRepository.create).toHaveBeenCalledTimes(1);
        expect(mockUserRepository.create).toHaveBeenCalledWith(mockDto);
    });
});