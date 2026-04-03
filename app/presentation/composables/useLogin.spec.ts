import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ref, computed } from 'vue';
import type { LoginDTO } from '../../infrastructure/Dtos/LoginDTO';

// 1. Preparamos nuestras variables simuladas
const mockExecute = vi.fn();

// En Nuxt, useCookie devuelve una referencia reactiva (ref). 
// Así que creamos un ref normal de Vue para simular el comportamiento de la cookie.
const mockCookieValue = ref<string | null>(null);

// 2. Mockeamos el módulo virtual '#imports' de Nuxt
vi.mock('#imports', () => ({
    useNuxtApp: () => ({
        $loginUseCase: {
            execute: mockExecute
        }
    }),
    useCookie: () => mockCookieValue
}));

// 3. Mockeamos las funciones reactivas globales (ref, computed) por si Nuxt las auto-importa
vi.stubGlobal('ref', ref);
vi.stubGlobal('computed', computed);

// IMPORTANTE: Importamos el composable DESPUÉS de hacer los mocks de '#imports'
import { useLogin } from './useLogin';

describe('useLogin Composable', () => {
    const mockCredentials: LoginDTO = {
        email: 'test@correo.com',
        password: 'password123'
    };

    beforeEach(() => {
        vi.clearAllMocks();
        // Limpiamos nuestra "cookie" falsa antes de cada test
        mockCookieValue.value = null;
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    // TEST 1: El Camino Feliz (Login exitoso)
    it('debe iniciar sesión, guardar el token en la cookie y actualizar el estado', async () => {
        // Arrange: Simulamos que el UseCase nos devuelve un token
        const mockResponse = { accessToken: 'jwt-token-12345' };
        mockExecute.mockResolvedValue(mockResponse);

        // Inicializamos el composable
        const { loginUser, isAuthenticated, token, isLoading, error } = useLogin();

        // Comprobamos el estado inicial
        expect(isAuthenticated.value).toBe(false);
        expect(token.value).toBeNull();

        // Act: Llamamos a la función de login
        const isSuccess = await loginUser(mockCredentials);

        // Assert: Verificamos que se llamó al caso de uso
        expect(mockExecute).toHaveBeenCalledTimes(1);
        expect(mockExecute).toHaveBeenCalledWith(mockCredentials);

        // Assert: Verificamos que todo el estado reactivo cambió correctamente
        expect(isSuccess).toBe(true);
        expect(token.value).toBe('jwt-token-12345'); // El token debe haberse guardado
        expect(isAuthenticated.value).toBe(true); // El computed property debe reaccionar
        expect(isLoading.value).toBe(false);
        expect(error.value).toBeNull();
    });

    // TEST 2: El Camino Triste (Credenciales inválidas)
    it('debe atrapar el error, no guardar ningún token y devolver false', async () => {
        // Arrange: Simulamos que el UseCase lanza un error
        const errorMessage = 'Credenciales inválidas';
        mockExecute.mockRejectedValue(new Error(errorMessage));

        const { loginUser, isAuthenticated, token, isLoading, error } = useLogin();

        // Act
        const isSuccess = await loginUser(mockCredentials);

        // Assert
        expect(mockExecute).toHaveBeenCalledTimes(1);

        // Verificamos el estado reactivo tras el fallo
        expect(isSuccess).toBe(false);
        expect(token.value).toBeNull(); // La cookie sigue vacía
        expect(isAuthenticated.value).toBe(false); // Sigue sin estar logueado
        expect(error.value).toBe(errorMessage); // Se guardó el mensaje de error para la UI
        expect(isLoading.value).toBe(false);
    });

    // TEST 3: Cerrar sesión (Logout)
    it('debe borrar el token de la cookie al hacer logout y actualizar isAuthenticated', () => {
        // Arrange: Pre-llenamos nuestra "cookie" como si ya estuviera logueado
        mockCookieValue.value = 'token-previo';

        const { logout, isAuthenticated, token } = useLogin();

        // Verificamos que sí entró logueado al test
        expect(isAuthenticated.value).toBe(true);
        expect(token.value).toBe('token-previo');

        // Act
        logout();

        // Assert: Verificamos que la limpieza funcionó
        expect(token.value).toBeNull();
        expect(isAuthenticated.value).toBe(false); // Reaccionó automáticamente
    });
});