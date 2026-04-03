import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetProfileUseCase } from '../../../../../app/core/use-cases/GetProfileUseCase';
import type { IAuthRepository } from '../../../../../app/core/interfaces/IAuthRepository';
import type { User } from '../../../../../app/core/entities/User';

describe('GetProfileUseCase', () => {
    let mockAuthRepository: IAuthRepository;
    let useCase: GetProfileUseCase;

    // Datos simulados para nuestras pruebas
    const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Un token falso

    const mockUser: User = {
        id: 1,
        name: 'Ana López',
        email: 'ana@correo.com',
        password: 'hashedpassword',
        role: 'admin',
        avatar: 'https://ejemplo.com/avatar.jpg'
    };

    beforeEach(() => {
        // 1. Creamos el mock del repositorio con vi.fn()
        mockAuthRepository = {
            getProfile: vi.fn(),
            // Si el IAuthRepository tiene login o register, no los necesitamos mockear aquí
        } as unknown as IAuthRepository;

        // 2. Inyectamos el mock en el Caso de Uso
        useCase = new GetProfileUseCase(mockAuthRepository);
    });

    // TEST 1: El Camino Feliz
    it('debe retornar el perfil del usuario cuando se proporciona un token válido', async () => {
        // Arrange: Configuramos el mock para que devuelva el usuario
        vi.mocked(mockAuthRepository.getProfile).mockResolvedValue(mockUser);

        // Act: Ejecutamos el caso de uso
        const result = await useCase.execute(mockToken);

        // Assert: Verificamos que se llamó al repo con el token correcto y devolvió la data
        expect(mockAuthRepository.getProfile).toHaveBeenCalledTimes(1);
        expect(mockAuthRepository.getProfile).toHaveBeenCalledWith(mockToken);
        expect(result).toEqual(mockUser);
    });

    // TEST 2: Validación propia del Caso de Uso (La guardia)
    it('debe lanzar un error si el token está vacío', async () => {
        // Act & Assert: Ejecutamos con un string vacío ('') y esperamos el error exacto
        await expect(useCase.execute('')).rejects.toThrow('No se proporcionó un token de acceso.');

        // IMPORTANTE: Verificamos que el repositorio NUNCA fue llamado para proteger la base de datos
        expect(mockAuthRepository.getProfile).not.toHaveBeenCalled();
    });

    // TEST 3: El Camino Triste (Error del servidor)
    it('debe propagar el error si el repositorio rechaza el token (ej. token expirado)', async () => {
        // Arrange: Simulamos que el backend rechaza el token
        const errorMessage = 'Token expirado o inválido';
        vi.mocked(mockAuthRepository.getProfile).mockRejectedValue(new Error(errorMessage));

        // Act & Assert: Verificamos que el error sube hacia el componente/composable
        await expect(useCase.execute(mockToken)).rejects.toThrow(errorMessage);

        // Verificamos que sí intentó llamar al repositorio
        expect(mockAuthRepository.getProfile).toHaveBeenCalledTimes(1);
    });
});