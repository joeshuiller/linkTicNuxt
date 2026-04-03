import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ref } from 'vue';
// Ajusta la ruta de importación de tu composable
import { useAuth } from '../../../../../app/presentation/composables/useAuth';
import type { CreateUserDTO } from '../../../../../app/infrastructure/Dtos/CreateUserDTO';
import type { User } from '../../../../../app/core/entities/User';

// 1. Mock de la reactividad de Vue (ref)
// Como Nuxt auto-importa 'ref', en los tests a veces necesitamos declararlo globalmente
vi.stubGlobal('ref', ref);

// 2. Mock del UseCase y useNuxtApp
const mockExecute = vi.fn();
const mockUseNuxtApp = vi.fn(() => ({
    $createUserUseCase: {
        execute: mockExecute
    }
}));
vi.stubGlobal('useNuxtApp', mockUseNuxtApp);

// 3. Mock del Toast
const mockNotify = vi.fn();
const mockUseToast = vi.fn(() => ({
    notify: mockNotify
}));
vi.stubGlobal('useToast', mockUseToast);


describe('useAuth Composable', () => {
    const mockDto: CreateUserDTO = {
        name: 'María',
        email: 'maria@correo.com',
        password: 'password123',
        avatar: 'https://ejemplo.com/avatar.jpg'
    };

    const mockUser: User = {
        id: 1,
        name: 'María',
        email: 'maria@correo.com',
        avatar: 'https://ejemplo.com/avatar.jpg',
        role: 'customer'
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    // TEST 1: El Camino Feliz (Registro exitoso)
    it('debe registrar al usuario, actualizar el estado, mostrar el toast y devolver el usuario', async () => {
        // Arrange: Simulamos que el Caso de Uso hace su trabajo con éxito
        mockExecute.mockResolvedValue(mockUser);

        // Inicializamos el composable
        const { registerUser, currentUser, isLoading, error } = useAuth();

        // Verificamos el estado inicial
        expect(isLoading.value).toBe(false);
        expect(error.value).toBeNull();
        expect(currentUser.value).toBeNull();

        // Act: Llamamos a la función
        const result = await registerUser(mockDto);

        // Assert: Verificamos los resultados
        expect(mockExecute).toHaveBeenCalledTimes(1);
        expect(mockExecute).toHaveBeenCalledWith(mockDto);

        // Verificamos que se mostró la notificación
        expect(mockNotify).toHaveBeenCalledTimes(1);
        expect(mockNotify).toHaveBeenCalledWith({
            title: '¡Registro exitoso!',
            message: 'Bienvenido María'
        });

        // Verificamos que el estado final es correcto
        expect(result).toEqual(mockUser);
        expect(currentUser.value).toEqual(mockUser);
        expect(isLoading.value).toBe(false); // Validamos que el bloque finally se ejecutó
        expect(error.value).toBeNull();
    });

    // TEST 2: El Camino Triste (Falla el registro)
    it('debe manejar el error, actualizar el estado de error y devolver null', async () => {
        // Arrange: Simulamos que el Caso de Uso lanza un error (ej. correo duplicado)
        const errorMessage = 'El correo ya está en uso';
        mockExecute.mockRejectedValue(new Error(errorMessage));

        const { registerUser, currentUser, isLoading, error } = useAuth();

        // Act
        const result = await registerUser(mockDto);

        // Assert
        expect(mockExecute).toHaveBeenCalledTimes(1);

        // El Toast NO debe haberse llamado si hubo error
        expect(mockNotify).not.toHaveBeenCalled();

        // Verificamos el estado de reactividad (variables ref)
        expect(result).toBeNull();
        expect(currentUser.value).toBeNull(); // No se guardó ningún usuario
        expect(error.value).toBe(errorMessage); // El error se guardó para mostrarlo en la UI
        expect(isLoading.value).toBe(false); // El bloque finally se ejecutó de todos modos
    });
});