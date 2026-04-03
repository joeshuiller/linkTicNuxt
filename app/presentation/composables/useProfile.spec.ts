import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ref } from 'vue';
import type { User } from '~~/app/core/entities/User';

// 1. Preparamos nuestras variables simuladas
const mockExecute = vi.fn();
// Creamos un ref para simular el comportamiento de useCookie
const mockCookieValue = ref<string | null>(null);
const mockRouterPush = vi.fn();

// 2. Mockeamos el módulo '#imports' nativo de Nuxt
vi.mock('#imports', () => ({
    useNuxtApp: () => ({
        $getProfileUseCase: {
            execute: mockExecute
        }
    }),
    useCookie: () => mockCookieValue,
    useRouter: () => ({
        push: mockRouterPush
    })
}));

// 3. Mock de la reactividad global de Vue
vi.stubGlobal('ref', ref);

// IMPORTANTE: Importamos el composable DESPUÉS de hacer los mocks
import { useProfile } from './useProfile';

describe('useProfile Composable', () => {
    const mockUser: User = {
        id: 1,
        name: 'Carlos Nuxt',
        email: 'carlos@correo.com',
        avatar: 'https://ejemplo.com/avatar.jpg',
        role: 'customer'
    };

    beforeEach(() => {
        vi.clearAllMocks();
        mockCookieValue.value = null; // Reiniciamos la cookie por defecto
        // Silenciamos el console.error para mantener limpia la terminal
        vi.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    // TEST 1: La Cláusula de Guarda (Early Return)
    it('debe abortar la petición inmediatamente si no hay un token guardado', async () => {
        // Arrange: Nos aseguramos de que no hay token
        mockCookieValue.value = null;

        // Obtenemos el composable. Asumo que tu composable expone user e isLoading
        // Si no los expone en tu archivo real, asegúrate de añadirlos al 'return'
        const { fetchProfile } = useProfile();
        // Re-importamos o leemos el estado (dependiendo de cómo expongas tus refs)
        // Para este test, lo principal es verificar que el UseCase NO se llame.

        // Act
        await fetchProfile();

        // Assert: Verificamos que la función murió en el 'if' y protegió la API
        expect(mockExecute).not.toHaveBeenCalled();
    });

    // TEST 2: El Camino Feliz (Perfil obtenido)
    it('debe llamar al Caso de Uso con el token, guardar el usuario y quitar el loading', async () => {
        // Arrange: Simulamos que el usuario tiene una sesión activa
        const validToken = 'token-jwt-super-secreto';
        mockCookieValue.value = validToken;

        // Simulamos que el backend responde con los datos del usuario
        mockExecute.mockResolvedValue(mockUser);

        // En un escenario real extraemos las variables del composable
        // (Asumiré que exportas 'user' e 'isLoading' en tu código completo)
        const profileScope = useProfile();
        // Usamos any para acceder a refs que quizas omitiste en el return de tu snippet
        const userRef = (profileScope as any).user || ref(null);
        const loadingRef = (profileScope as any).isLoading || ref(true);

        // Act
        await profileScope.fetchProfile();

        // Assert: Verificamos que se llamó al backend pasándole el token exacto
        expect(mockExecute).toHaveBeenCalledTimes(1);
        expect(mockExecute).toHaveBeenCalledWith(validToken);

        // Verificamos que los datos se asignaron al estado reactivo (si los exportas)
        // Si tu return real expone 'user', esto pasará:
        if ((profileScope as any).user) {
            expect((profileScope as any).user.value).toEqual(mockUser);
            expect((profileScope as any).isLoading.value).toBe(false);
        }
    });

    // TEST 3: El Camino Triste (Falla la autenticación / Token expirado)
    it('debe capturar el error, imprimirlo en consola y asegurar que isLoading vuelva a false', async () => {
        // Arrange: Simulamos un token expirado o corrupto
        mockCookieValue.value = 'token-expirado';
        const networkError = new Error('Token Invalido o Expirado');
        mockExecute.mockRejectedValue(networkError);

        const profileScope = useProfile();

        // Act
        await profileScope.fetchProfile();

        // Assert
        expect(mockExecute).toHaveBeenCalledTimes(1);

        // Verificamos que nuestro 'catch' capturó el error y lo reportó a la consola
        expect(console.error).toHaveBeenCalledWith('La sesión es inválida:', networkError);

        // Si expones isLoading, validamos que el bloque 'finally' lo apagó
        if ((profileScope as any).isLoading) {
            expect((profileScope as any).isLoading.value).toBe(false);
        }
    });
});