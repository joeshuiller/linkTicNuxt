// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
    // Aquí asumo que usas un composable o store para verificar el token/sesión
    const auth = useLogin();

    // Si no está autenticado, lo enviamos al login
    if (!auth.isAuthenticated.value) {
        // navigateTo es la forma recomendada en Nuxt 3 para redirecciones en middleware
        return navigateTo('/login');
    }
})