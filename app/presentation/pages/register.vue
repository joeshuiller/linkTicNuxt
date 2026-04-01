<template>
    <div class="container">
                <div class="max-w-md mx-auto mt-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden">
    
                    <div class="px-6 py-5 border-b border-gray-200 dark:border-gray-800">
                    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Crear Cuenta</h1>
                    <p class="text-sm text-gray-500 mt-1">Únete a nuestra plataforma de e-commerce.</p>
                    </div>

                    <form @submit.prevent="onSubmit" class="p-6 space-y-5">
                    
                    <div>
                        <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Nombre completo
                        </label>
                        <input 
                        id="name" 
                        v-model="state.name" 
                        type="text" 
                        placeholder="Ej. Nicolas" 
                        class="block w-full px-3 py-2 bg-white dark:bg-gray-950 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm text-gray-900 dark:text-white transition-colors"
                        :class="validationErrors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-700 focus:border-blue-500'"
                        />
                        <p v-if="validationErrors.name" class="mt-1 text-sm text-red-500">{{ validationErrors.name }}</p>
                    </div>

                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Correo Electrónico
                        </label>
                        <input 
                        id="email" 
                        v-model="state.email" 
                        type="email" 
                        placeholder="nico@gmail.com" 
                        class="block w-full px-3 py-2 bg-white dark:bg-gray-950 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm text-gray-900 dark:text-white transition-colors"
                        :class="validationErrors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-700 focus:border-blue-500'"
                        />
                        <p v-if="validationErrors.email" class="mt-1 text-sm text-red-500">{{ validationErrors.email }}</p>
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Contraseña
                        </label>
                        <input 
                        id="password" 
                        v-model="state.password" 
                        type="password" 
                        placeholder="••••••••" 
                        class="block w-full px-3 py-2 bg-white dark:bg-gray-950 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm text-gray-900 dark:text-white transition-colors"
                        :class="validationErrors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-700 focus:border-blue-500'"
                        />
                        <p v-if="validationErrors.password" class="mt-1 text-sm text-red-500">{{ validationErrors.password }}</p>
                    </div>

                    <div>
                        <label for="avatar" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        URL del Avatar
                        </label>
                        <input 
                        id="avatar" 
                        v-model="state.avatar" 
                        type="text" 
                        placeholder="https://picsum.photos/800" 
                        class="block w-full px-3 py-2 bg-white dark:bg-gray-950 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm text-gray-900 dark:text-white transition-colors"
                        :class="validationErrors.avatar ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-700 focus:border-blue-500'"
                        />
                        <p v-if="validationErrors.avatar" class="mt-1 text-sm text-red-500">{{ validationErrors.avatar }}</p>
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
                        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {{ isLoading ? 'Procesando...' : 'Registrarse' }}
                    </button>
                    
                    </form>
                </div>
                <button
                type="button"
                data-ripple-light="true"
                class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                >
                Button
                </button>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { z } from 'zod';

const { registerUser, isLoading, error } = useAuth();
const router = useRouter();

const state = reactive<CreateUserDTO>({
  name: '',
  email: '',
  password: '',
  avatar: 'https://picsum.photos/800'
});

// Estado para almacenar los errores de validación del formulario
const validationErrors = ref<Record<string, string>>({});

const schema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Debe ser un correo electrónico válido'),
  password: z.string().min(4, 'La contraseña debe tener al menos 4 caracteres'),
  avatar: z.string().url('Debe ser una URL válida')
});

const onSubmit = async () => {
  // 1. Limpiamos los errores previos
  validationErrors.value = {};

  // 2. Ejecutamos la validación de Zod manualmente (safeParse no lanza excepciones)
  const result = schema.safeParse(state);

  // 3. Si falla, mapeamos los errores a nuestro objeto reactivo
  if (!result.success) {
    result.error.issues.forEach(issue => {
      // Tomamos el primer path (ej. 'email') y le asignamos el mensaje
      validationErrors.value[issue.path[0]] = issue.message;
    });
    return; // Detenemos la ejecución aquí
  }

  // 4. Si todo es válido (result.data), llamamos al Caso de Uso
  const user = await registerUser(result.data);

  if (user) {
    router.push('/profile');
  }
};
</script>
<style lang="scss">
.container .content {
  @apply flex flex-col justify-center items-center sm:p-2 md:p-4 lg:p-8 xl:p-16;
  main {
    @apply max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6;
  }
}
</style>