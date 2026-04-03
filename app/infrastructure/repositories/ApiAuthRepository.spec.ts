import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ApiAuthRepository } from './ApiAuthRepository';
import { $fetch } from 'ofetch';
import { API_URLS } from '../../shared/urlList';
import type { LoginDTO } from '../../infrastructure/Dtos/LoginDTO';

// 1. Mockeamos la librería 'ofetch' completa para interceptar $fetch
vi.mock('ofetch', () => ({
    $fetch: vi.fn(),
}));

// 2. Opcional pero recomendado: Mockeamos API_URLS para no depender de variables de entorno reales
vi.mock('../../shared/urlList', () => ({
    API_URLS: {
        getAuthProfile: vi.fn(() => 'https://api.fake.com/profile'),
        getAuthLogin: vi.fn(() => 'https://api.fake.com/login'),
    }
}));

describe('ApiAuthRepository', () => {
    let repository: ApiAuthRepository;

    beforeEach(() => {
        // Restauramos los mocks antes de cada test para que no se mezclen
        vi.clearAllMocks();
        repository = new ApiAuthRepository();

        // Silenciamos los console.error durante los tests para mantener limpia la terminal
        vi.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    // ==========================================
    // TESTS PARA getProfile
    // ==========================================
    describe('getProfile', () => {
        const mockToken = 'fake-jwt-token';
        const mockRawUser = {
            id: 1,
            name: 'Test User',
            email: 'test@correo.com',
            avatar: 'avatar.jpg',
            role: 'admin'
        };

        it('debe obtener el perfil del usuario y pasarlo por el mapper correctamente', async () => {
            // Arrange: Simulamos que $fetch devuelve el usuario crudo
            vi.mocked($fetch).mockResolvedValue(mockRawUser);

            // Act
            const result = await repository.getProfile(mockToken);

            // Assert
            expect($fetch).toHaveBeenCalledTimes(1);
            expect($fetch).toHaveBeenCalledWith('https://api.fake.com/profile', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${mockToken}`
                }
            });

            // Comprobamos que el resultado pasó por el mapper y tiene la estructura correcta
            expect(result.id).toBe(mockRawUser.id);
            expect(result.email).toBe(mockRawUser.email);
        });

        it('debe capturar el error de red y lanzar un error limpio para la UI', async () => {
            // Arrange: Simulamos un error 500 o 401 de la API
            vi.mocked($fetch).mockRejectedValue(new Error('Internal Server Error'));

            // Act & Assert
            await expect(repository.getProfile(mockToken)).rejects.toThrow('Error al obtener el perfil.');

            // Comprobamos que el console.error se disparó (útil para el programador)
            expect(console.error).toHaveBeenCalled();
        });
    });

    // ==========================================
    // TESTS PARA login
    // ==========================================
    describe('login', () => {
        const mockCredentials: LoginDTO = {
            email: 'test@correo.com',
            password: 'password123'
        };

        it('debe hacer el login y transformar snake_case a camelCase en el token', async () => {
            // Arrange: La API responde en snake_case (access_token)
            const apiResponse = {
                access_token: 'token-acceso-123',
                refresh_token: 'token-refresco-456'
            };
            vi.mocked($fetch).mockResolvedValue(apiResponse);

            // Act
            const result = await repository.login(mockCredentials);

            // Assert: Verificamos los parámetros del $fetch
            expect($fetch).toHaveBeenCalledTimes(1);
            expect($fetch).toHaveBeenCalledWith('https://api.fake.com/login', {
                method: 'POST',
                body: mockCredentials
            });

            // Assert: Verificamos el mapeo (La entidad de nuestro dominio usa camelCase)
            expect(result).toEqual({
                accessToken: apiResponse.access_token,
                refreshToken: apiResponse.refresh_token
            });
        });

        it('debe capturar credenciales inválidas y lanzar un mensaje amigable', async () => {
            // Arrange: Simulamos un error 400 Bad Request o 401 Unauthorized
            vi.mocked($fetch).mockRejectedValue(new Error('FetchError: 401 Unauthorized'));

            // Act & Assert
            await expect(repository.login(mockCredentials)).rejects.toThrow('Credenciales inválidas. Por favor, verifica tu correo y contraseña.');

            expect(console.error).toHaveBeenCalled();
        });
    });
});