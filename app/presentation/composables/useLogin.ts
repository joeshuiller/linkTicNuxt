import type { LoginDTO } from '../../infrastructure/Dtos/LoginDTO';
// Importamos useCookie de Nuxt para guardar el token
import { useCookie, useNuxtApp } from '#imports';

export const useLogin = () => {
    const { $loginUseCase } = useNuxtApp();

    const isLoading = ref(false);
    const error = ref<string | null>(null);

    // Guardamos el token en una cookie segura para que persista
    const token = useCookie<string | null>('auth_token', {
        maxAge: 60 * 60 * 24 // 1 día de duración
    });

    const loginUser = async (credentials: LoginDTO) => {
        isLoading.value = true;
        error.value = null;

        try {
            const result = await $loginUseCase.execute(credentials);

            // Si fue exitoso, guardamos el token en la cookie
            token.value = result.accessToken;

            return true;
        } catch (err: any) {
            error.value = err.message;
            return false;
        } finally {
            isLoading.value = false;
        }
    };

    const logout = () => {
        token.value = null; // Borramos la cookie
    };

    // Un computed para saber si el usuario está logueado rápidamente
    const isAuthenticated = computed(() => !!token.value);

    return {
        loginUser,
        logout,
        isAuthenticated,
        token,
        isLoading,
        error
    };
};