<template>
  <div class="max-w-md w-full mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden">
    
    <div class="px-6 py-5 border-b border-gray-200 dark:border-gray-800 text-center">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Iniciar Sesión</h1>
      <p class="text-sm text-gray-500 mt-1">Ingresa a tu cuenta para continuar</p>
    </div>

    <form @submit.prevent="onSubmit" class="p-6 space-y-5">
      
      <div>
        <label for="login-email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Correo Electrónico
        </label>
        <input 
          id="login-email" 
          v-model="state.email" 
          type="email" 
          placeholder="john@mail.com" 
          class="block w-full px-3 py-2 bg-white dark:bg-gray-950 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 sm:text-sm text-gray-900 dark:text-white transition-colors"
          :class="validationErrors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-700 focus:border-brand-500'"
        />
        <p v-if="validationErrors.email" class="mt-1 text-sm text-red-500">{{ validationErrors.email }}</p>
      </div>

      <div>
        <div class="flex justify-between items-center mb-1">
          <label for="login-password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Contraseña
          </label>
          <a href="#" class="text-xs font-medium text-brand-600 hover:text-brand-500">¿Olvidaste tu contraseña?</a>
        </div>
        <input 
          id="login-password" 
          v-model="state.password" 
          type="password" 
          placeholder="••••••••" 
          class="block w-full px-3 py-2 bg-white dark:bg-gray-950 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 sm:text-sm text-gray-900 dark:text-white transition-colors"
          :class="validationErrors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-700 focus:border-brand-500'"
        />
        <p v-if="validationErrors.password" class="mt-1 text-sm text-red-500">{{ validationErrors.password }}</p>
      </div>

      <div v-if="error" class="p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md flex items-start">
        <svg class="h-5 w-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
        <p class="text-sm font-medium text-red-800 dark:text-red-300">{{ error }}</p>
      </div>

      <button 
        type="submit" 
        :disabled="isLoading"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {{ isLoading ? 'Iniciando sesión...' : 'Entrar' }}
      </button>
      
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { z } from 'zod';

const { loginUser, isLoading, error } = useLogin();
const router = useRouter();

// Estado del formulario
const state = reactive<LoginDTO>({
  email: '',
  password: ''
});

// Estado de errores de validación de Zod
const validationErrors = ref<Record<string, string>>({});

// Esquema de validación
const schema = z.object({
  email: z.string().min(1, 'El correo es obligatorio').email('Formato de correo inválido'),
  password: z.string().min(1, 'La contraseña es obligatoria')
});

const onSubmit = async () => {
  validationErrors.value = {}; // Limpiamos errores

  // Validamos con Zod
  const result = schema.safeParse(state);

  if (!result.success) {
    result.error.issues.forEach(issue => {
      validationErrors.value[issue.path[0]] = issue.message;
    });
    return;
  }

  // Llamamos al composable (que ejecuta el Caso de Uso)
  const success = await loginUser(result.data);

  if (success) {
    // Si el login es exitoso, redirigimos al catálogo
    router.push('/profile');
  }
};
</script>