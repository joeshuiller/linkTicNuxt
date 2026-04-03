import { describe, test, expect, vi, beforeEach, beforeAll, afterAll } from 'vitest';
// Importamos 'ref' directamente de Vue para inyectarlo en el entorno de Node
import { ref } from 'vue';
import type { CreateUserDTO } from '../../../../../app/infrastructure/Dtos/CreateUserDTO';

// 1. Preparamos las funciones espía (Mocks)
const mockExecuteUseCase = vi.fn();
const mockToastAdd = vi.fn();

describe('useAuth Composable', () => {
    let useAuth: any;

    beforeAll(async () => {
        // 2. 🚨 INYECTAMOS LOS AUTO-IMPORTS DE NUXT/VUE GLOBALMENTE

        // Inyectamos el 'ref' real de Vue para que la reactividad funcione en el test
        vi.stubGlobal('ref', ref);

        // Simulamos useNuxtApp para que devuelva nuestro UseCase mockeado
        vi.stubGlobal('useNuxtApp', () => ({
            $createUserUseCase: {
                execute: mockExecuteUseCase
            }
        }));

        // Simulamos el composable de notificaciones de Nuxt UI
        vi.stubGlobal('useToast', () => ({
            add: mockToastAdd
        }));

        // 3. IMPORTACIÓN DINÁMICA
        // Ajusta la ruta para que apunte exactamente a tu archivo useAuth.ts
        const module = await import('../../../../../app/presentation/composables/useAuth');
        useAuth = module.useAuth;
    });

    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterAll(() => {
        vi.unstubAllGlobals();
    });

    // ==========================================
    // TEST 1: El Camino Feliz
    // ==========================================
    test('debe registrar un usuario exitosamente, actualizar el estado y mostrar un toast', async () => {
        // Arrange
        const mockDto: CreateUserDTO = {
            name: 'Carlos',
            email: 'carlos@correo.com',
            password: 'password123',
            avatar: 'avatar.jpg'
        };

        const mockCreatedUser = {
            id: 1,
            name: 'Carlos',
            email: 'carlos@correo.com',
            avatar: 'avatar.jpg',
            role: 'customer'
        };

        // Le decimos al UseCase falso que responda con éxito
        mockExecuteUseCase.mockResolvedValue(mockCreatedUser);

        // Instanciamos el composable
        const auth = useAuth();

        // Verificamos el estado inicial
        expect(auth.isLoading.value).toBe(false);
        expect(auth.currentUser.value).toBeNull();

        // Act
        const result = await auth.registerUser(mockDto);

        // Assert
        expect(mockExecuteUseCase).toHaveBeenCalledTimes(1);
        expect(mockExecuteUseCase).toHaveBeenCalledWith(mockDto);

        // Verificamos que los estados reactivos se actualizaron
        expect(auth.currentUser.value).toEqual(mockCreatedUser);
        expect(auth.error.value).toBeNull();
        expect(auth.isLoading.value).toBe(false); // Debe volver a false en el finally

        // Verificamos la notificación
        expect(mockToastAdd).toHaveBeenCalledTimes(1);
        expect(mockToastAdd).toHaveBeenCalledWith(expect.objectContaining({
            title: '¡Registro exitoso!',
            color: 'success'
        }));

        // Verificamos el retorno de la función
        expect(result).toEqual(mockCreatedUser);
    });

    // ==========================================
    // TEST 2: El Camino Triste (Error de API/Validación)
    // ==========================================
    test('debe capturar un error si falla el registro, actualizar el estado de error y no mostrar toast', async () => {
        // Arrange
        const mockDto: CreateUserDTO = {
            name: 'Carlos',
            email: 'correo-invalido', // Simulamos un dato malo
            password: '123',
            avatar: ''
        };

        const errorMessage = 'El correo ya está en uso.';
        // Simulamos que el UseCase lanza una excepción (como lo haría si falla la API)
        mockExecuteUseCase.mockRejectedValue(new Error(errorMessage));

        const auth = useAuth();

        // Act
        const result = await auth.registerUser(mockDto);

        // Assert
        expect(mockExecuteUseCase).toHaveBeenCalledTimes(1);

        // El usuario debe seguir siendo null porque falló
        expect(auth.currentUser.value).toBeNull();

        // El error debe haberse guardado en el estado reactivo
        expect(auth.error.value).toBe(errorMessage);

        // El loading debe volver a apagarse en el bloque finally
        expect(auth.isLoading.value).toBe(false);

        // No debería haber llamado a la notificación de éxito
        expect(mockToastAdd).not.toHaveBeenCalled();

        // La función debe retornar null
        expect(result).toBeNull();
    });
});