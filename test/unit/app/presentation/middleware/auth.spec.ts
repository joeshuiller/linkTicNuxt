import { describe, it, expect, vi, beforeEach, beforeAll, afterAll } from 'vitest';

// 1. Creamos las funciones espía
const mockNavigateTo = vi.fn();
const mockUseLogin = vi.fn();

describe('Auth Middleware', () => {
    let authMiddleware: any;

    beforeAll(async () => {
        // 2. 🚨 PREPARAMOS EL TERRENO PRIMERO
        // Inyectamos las funciones mágicas de Nuxt en el entorno global
        vi.stubGlobal('defineNuxtRouteMiddleware', (middlewareFn: any) => middlewareFn);
        vi.stubGlobal('navigateTo', mockNavigateTo);
        vi.stubGlobal('useLogin', mockUseLogin);

        // 3. 🚨 IMPORTACIÓN DINÁMICA
        // Al importar el archivo AQUÍ adentro, garantizamos que Node.js ya
        // conozca 'defineNuxtRouteMiddleware' antes de leerlo.
        // (Asegúrate de que la ruta sea la correcta hacia tu middleware)
        const module = await import('../../../../../app/presentation/middleware/auth');
        authMiddleware = module.default;
    });

    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterAll(() => {
        vi.unstubAllGlobals();
    });

    // TEST 1: El intruso (No autenticado)
    it('debe redirigir a /login si isAuthenticated.value es false', () => {
        // Arrange: Simulamos que el usuario no está logueado
        mockUseLogin.mockReturnValue({
            isAuthenticated: { value: false }
        });

        const to = { path: '/profile' } as any;
        const from = { path: '/' } as any;

        // Act: Ejecutamos el middleware
        authMiddleware(to, from);

        // Assert: Verificamos que lo mande al login
        expect(mockNavigateTo).toHaveBeenCalledTimes(1);
        expect(mockNavigateTo).toHaveBeenCalledWith('/login');
    });

    // TEST 2: El usuario legítimo (Autenticado)
    it('debe permitir el acceso si isAuthenticated.value es true', () => {
        // Arrange: Simulamos que el usuario SÍ está logueado
        mockUseLogin.mockReturnValue({
            isAuthenticated: { value: true }
        });

        const to = { path: '/profile' } as any;
        const from = { path: '/' } as any;

        // Act
        const result = authMiddleware(to, from);

        // Assert: No debe llamar a navigateTo
        expect(mockNavigateTo).not.toHaveBeenCalled();
        expect(result).toBeUndefined(); // Deja pasar la ruta
    });
});