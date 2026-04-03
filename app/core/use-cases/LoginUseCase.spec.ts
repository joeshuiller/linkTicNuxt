import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoginUseCase } from './LoginUseCase';
import type { IAuthRepository } from '../interfaces/IAuthRepository';
import type { AuthToken } from '../entities/AuthToken';
import type { LoginDTO } from '../../infrastructure/Dtos/LoginDTO';

describe('LoginUseCase', () => {
    let mockAuthRepository: IAuthRepository;
    let useCase: LoginUseCase;

    // Datos simulados (Dummies) para el DTO de entrada
    const mockCredentials: LoginDTO = {
        email: 'usuario@correo.com',
        password: 'passwordSeguro123'
    };

    // Datos simulados (Dummies) para la respuesta esperada
    const mockTokenResponse: AuthToken = {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ejemplo...',
        refresh_token: 'def50200a89a05e... (opcional dependiendo de tu entidad)'
    };

    beforeEach(() => {
        // 1. Creamos el mock del repositorio interceptando el método login
        mockAuthRepository = {
            login: vi.fn(),
            // Ignoramos otros métodos (como getProfile o register) porque este test no los usa
        } as unknown as IAuthRepository;

        // 2. Inyectamos el repositorio simulado en el Caso de Uso
        useCase = new LoginUseCase(mockAuthRepository);
    });

    // TEST 1: El Camino Feliz (Credenciales correctas)
    it('debe retornar un token de autenticación cuando las credenciales son válidas', async () => {
        // Arrange: Simulamos que el repositorio responde con éxito y devuelve el token
        vi.mocked(mockAuthRepository.login).mockResolvedValue(mockTokenResponse);

        // Act: Ejecutamos el caso de uso con las credenciales
        const result = await useCase.execute(mockCredentials);

        // Assert: Verificamos que llamó al repo correctamente y retornó los datos intactos
        expect(mockAuthRepository.login).toHaveBeenCalledTimes(1);
        expect(mockAuthRepository.login).toHaveBeenCalledWith(mockCredentials);
        expect(result).toEqual(mockTokenResponse);
    });

    // TEST 2: Credenciales inválidas (Error de Autenticación)
    it('debe propagar un error si el repositorio rechaza las credenciales', async () => {
        // Arrange: Simulamos que el backend responde con un error de credenciales
        const errorMessage = 'Correo o contraseña incorrectos';
        vi.mocked(mockAuthRepository.login).mockRejectedValue(new Error(errorMessage));

        // Act & Assert: Verificamos que el error sube hacia el controlador/composable
        await expect(useCase.execute(mockCredentials)).rejects.toThrow(errorMessage);

        // Validamos que el método sí fue llamado con los datos enviados
        expect(mockAuthRepository.login).toHaveBeenCalledTimes(1);
        expect(mockAuthRepository.login).toHaveBeenCalledWith(mockCredentials);
    });

    // TEST 3: Error de red o servidor
    it('debe propagar un error si falla la comunicación con la base de datos/API', async () => {
        // Arrange: Simulamos una caída del servidor
        const networkError = 'Error interno del servidor (500)';
        vi.mocked(mockAuthRepository.login).mockRejectedValue(new Error(networkError));

        // Act & Assert
        await expect(useCase.execute(mockCredentials)).rejects.toThrow(networkError);
        expect(mockAuthRepository.login).toHaveBeenCalledTimes(1);
    });
});