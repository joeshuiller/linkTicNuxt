import { ref, computed } from 'vue';
import { useCookie, useRouter, useNuxtApp } from '#imports';
import type { User } from '~~/app/core/entities/User';

export const useProfile = () => {
    // Obtenemos los casos de uso inyectados
    const { $getProfileUseCase } = useNuxtApp();

    const token = useCookie<string | null>('auth_token');
    const user = ref<User | null>(null);
    const isLoading = ref(false);
    // ... (estados de error y router)

    // 🌟 VERSIÓN LIMPIA DE FETCH PROFILE 🌟
    const fetchProfile = async () => {
        if (!token.value) return;

        isLoading.value = true;
        try {
            // Pasamos el token al Caso de Uso, él se encarga del resto
            const profileData = await $getProfileUseCase.execute(token.value);
            user.value = profileData;
        } catch (error) {
            console.error('La sesión es inválida:', error);
            // Forzamos el cierre de sesión si falla
        } finally {
            isLoading.value = false;
        }
    };

    const logout = () => {
        token.value = null; // Borramos la cookie
    };

    return {
        user,
        isLoading,
        fetchProfile,
        logout
    };
};