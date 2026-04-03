// middleware/guest.ts
export default defineNuxtRouteMiddleware((to, from) => {
    const token = useLogin();
    // Si YA hay un token (ya está logueado), no tiene sentido que vea el Login/Registro
    if (token.isAuthenticated.value) {
        // Lo mandamos directo a su perfil o al inicio
        return navigateTo('/profile');
    }
});