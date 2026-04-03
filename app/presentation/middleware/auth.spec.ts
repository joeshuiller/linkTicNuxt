import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// 1. Mockeamos las funciones auto-importadas de Nuxt
vi.mock('#imports', () => ({
    // Hacemos que defineNuxtRouteMiddleware simplemente devuelva la función interna
    // para que podamos ejecutarla directamente en nuestras pruebas.
    defineNuxtRouteMiddleware: vi.fn((callback) => callback),

    // Creamos un espía para verificar si se llama a la redirección
    navigateTo: vi.fn(),
}));

// 2. Mockeamos el composable useLogin 
// (Asegúrate de ajustar esta ruta relativa a donde se encuentre tu composable real)
vi.mock('../composables/useLogin', () => ({
    useLogin: vi.fn(),
}));

// IMPORTANTE: Las importaciones van DESPUÉS de hacer los mocks
import authMiddleware from './auth';
import { navigateTo } from '#imports';
import { useLogin } from '../composables/useLogin';

describe('Auth Middleware', () => {
    // Objetos de ruta simulados (Nuxt los envía por defecto, aunque no los usemos aquí)
    const to = { path: '/profile' } as any;
    const from = { path: '/' } as any;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    // TEST 1: El Camino Feliz (Usuario Logueado)
    it('debe permitir la navegación si el usuario ESTÁ autenticado', () => {
        // Arrange: Simulamos que useLogin nos dice que SÍ hay sesión
        vi.mocked(useLogin).mockReturnValue({
            isAuthenticated: { value: true }
        } as any);

        // Act: Ejecutamos el middleware
        // (Como mockeamos defineNuxtRouteMiddleware, authMiddleware es literalmente tu callback)
        const result = authMiddleware(to, from);

        // Assert: Verificamos que NO se llamó a navigateTo
        expect(navigateTo).not.toHaveBeenCalled();

        // Si un middleware de Nuxt devuelve undefined o void, significa "deja pasar al usuario"
        expect(result).toBeUndefined();
    });

    // TEST 2: El Camino Triste (Intruso sin sesión)
    it('debe redirigir a /login si el usuario NO está autenticado', () => {
        // Arrange: Simulamos que useLogin nos dice que NO hay sesión
        vi.mocked(useLogin).mockReturnValue({
            isAuthenticated: { value: false }
        } as any);

        // Act: Ejecutamos el middleware intentando ir a /profile
        authMiddleware(to, from);

        // Assert: Verificamos que el guardia detuvo al usuario y lo mandó al login
        expect(navigateTo).toHaveBeenCalledTimes(1);
        expect(navigateTo).toHaveBeenCalledWith('/login');
    });
});