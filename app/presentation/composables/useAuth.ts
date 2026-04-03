import type { User } from '../../core/entities/User';
import type { CreateUserDTO } from '../../infrastructure/Dtos/CreateUserDTO';

export const useAuth = () => {
    const { $createUserUseCase } = useNuxtApp();

    const isLoading = ref(false);
    const error = ref<string | null>(null);
    const currentUser = ref<User | null>(null);

    const registerUser = async (userData: CreateUserDTO) => {
        isLoading.value = true;
        error.value = null;

        try {
            const newUser = await $createUserUseCase.execute(userData);
            currentUser.value = newUser;

            // Opcional: Mostrar un Toast de éxito si usas Nuxt UI
            const toast = useToast();
            if (toast) {
                toast.add({
                    title: '¡Registro exitoso!',
                    description: `${newUser.name} se ha registrado correctamente.`,
                    color: 'success' // Opcional: le da un toque verde de éxito
                });
            }
            return newUser;
        } catch (err: any) {
            error.value = err.message;
            return null;
        } finally {
            isLoading.value = false;
        }
    };

    return {
        registerUser,
        currentUser,
        isLoading,
        error
    };
};