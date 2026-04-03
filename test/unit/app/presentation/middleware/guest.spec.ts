import { describe, test, expect, vi, beforeEach, beforeAll, afterAll } from 'vitest';

// 1. Creamos las funciones espía globales
const mockNavigateTo = vi.fn();
const mockUseLogin = vi.fn();

describe('Guest Middleware', () => {
    let guestMiddleware: any;

    // Objetos de ruta simulados compartidos
    const to = { path: '/login' } as any;
    const from = { path: '/' } as any;

    beforeAll(async () => {
        // 2. PREPARAMOS EL TERRENO (Igual que en auth.spec.ts)
        vi.stubGlobal('defineNuxtRouteMiddleware', (middlewareFn: any) => middlewareFn);
        vi.stubGlobal('navigateTo', mockNavigateTo);
        vi.stubGlobal('useLogin', mockUseLogin);

        // 3. IMPORTACIÓN DINÁMICA
        // Asegúrate de ajustar esta ruta para que apunte a tu middleware guest.ts
        const module = await import('../../../../../app/presentation/middleware/guest');
        guestMiddleware = module.default;
    });

    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterAll(() => {
        vi.unstubAllGlobals();
    });

    // TEST 1: El Camino Feliz (El usuario es un invitado real)
    test('debe permitir la navegación si el usuario NO está autenticado', () => {
        // Arrange: Simulamos que NO hay sesión activa
        mockUseLogin.mockReturnValue({
            isAuthenticated: { value: false }
        });

        // Act: Ejecutamos el middleware
        const result = guestMiddleware(to, from);

        // Assert: Verificamos que el usuario puede pasar a ver el Login
        expect(mockNavigateTo).not.toHaveBeenCalled();
        expect(result).toBeUndefined(); // Undefined significa "sigue tu camino"
    });

    // TEST 2: El Camino Triste (Un usuario logueado intentando entrar al Login)
    test('debe redirigir a /profile si el usuario YA está autenticado', () => {
        // Arrange: Simulamos que YA hay una sesión activa
        mockUseLogin.mockReturnValue({
            isAuthenticated: { value: true }
        });

        // Act
        guestMiddleware(to, from);

        // Assert: Verificamos que el guardia lo detiene y lo manda a su perfil
        expect(mockNavigateTo).toHaveBeenCalledTimes(1);
        expect(mockNavigateTo).toHaveBeenCalledWith('/profile');
    });
});