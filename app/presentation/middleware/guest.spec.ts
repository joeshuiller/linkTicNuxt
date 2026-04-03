import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// 1. Mockeamos las utilidades de Nuxt
vi.mock('#imports', () => ({
    // Hacemos que la función devuelva el callback puro para poder testearlo
    defineNuxtRouteMiddleware: vi.fn((callback) => callback),

    // Espía para verificar a dónde mandamos al usuario
    navigateTo: vi.fn(),
}));

// 2. Mockeamos el composable (Ajusta la ruta si es necesario)
vi.mock('../composables/useLogin', () => ({
    useLogin: vi.fn(),
}));

// IMPORTANTE: Importamos todo después de definir los mocks
import guestMiddleware from './guest';
import { navigateTo } from '#imports';
import { useLogin } from '../composables/useLogin';

describe('Guest Middleware', () => {
    // Simulamos los objetos de ruta (ej. el usuario intenta ir a /login)
    const to = { path: '/login' } as any;
    const from = { path: '/' } as any;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    // TEST 1: El Camino Feliz para el Middleware (El usuario SÍ es un invitado)
    it('debe permitir la navegación si el usuario NO está autenticado', () => {
        // Arrange: Simulamos que NO hay sesión activa
        vi.mocked(useLogin).mockReturnValue({
            isAuthenticated: { value: false }
        } as any);

        // Act: Ejecutamos el middleware
        const result = guestMiddleware(to, from);

        // Assert: Verificamos que el usuario puede pasar a ver el Login
        expect(navigateTo).not.toHaveBeenCalled();
        expect(result).toBeUndefined(); // Undefined significa "sigue tu camino"
    });

    // TEST 2: El Camino Triste (Un usuario logueado intentando entrar al Login)
    it('debe redirigir a /profile si el usuario YA está autenticado', () => {
        // Arrange: Simulamos que YA hay una sesión activa
        vi.mocked(useLogin).mockReturnValue({
            isAuthenticated: { value: true }
        } as any);

        // Act
        guestMiddleware(to, from);

        // Assert: Verificamos que el guardia lo detiene y lo manda a su perfil
        expect(navigateTo).toHaveBeenCalledTimes(1);
        expect(navigateTo).toHaveBeenCalledWith('/profile');
    });
});