<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
    
    <div class="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform transition-all hover:scale-[1.01]">
      
      <div class="px-8 py-10 text-center bg-gradient-to-br from-indigo-50 to-white dark:from-gray-800 dark:to-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div class="mx-auto w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mb-4 shadow-md">
           <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
           </svg>
        </div>
        <h1 class="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Crear Cuenta</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">Únete a nuestra plataforma y comienza a explorar.</p>
      </div>

      <form @submit.prevent="onSubmit" class="p-8 space-y-6">
        
        <div>
          <label for="name" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Nombre completo
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <input 
              id="name" 
              v-model="state.name" 
              type="text" 
              placeholder="Ej. Juan Pérez" 
              class="block w-full pl-10 pr-3 py-3 bg-gray-50 dark:bg-gray-900 border rounded-xl focus:outline-none focus:ring-2 sm:text-sm text-gray-900 dark:text-white transition-all duration-200"
              :class="validationErrors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-800' : 'border-gray-200 dark:border-gray-700 focus:border-indigo-500 focus:ring-indigo-100 dark:focus:ring-indigo-900'"
            />
          </div>
          <p v-if="validationErrors.name" class="mt-2 text-sm text-red-500 flex items-center">
            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
            {{ validationErrors.name }}
          </p>
        </div>

        <div>
          <label for="email" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Correo Electrónico
          </label>
          <div class="relative">
             <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <input 
              id="email" 
              v-model="state.email" 
              type="email" 
              placeholder="tu@correo.com" 
              class="block w-full pl-10 pr-3 py-3 bg-gray-50 dark:bg-gray-900 border rounded-xl focus:outline-none focus:ring-2 sm:text-sm text-gray-900 dark:text-white transition-all duration-200"
              :class="validationErrors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-800' : 'border-gray-200 dark:border-gray-700 focus:border-indigo-500 focus:ring-indigo-100 dark:focus:ring-indigo-900'"
            />
          </div>
          <p v-if="validationErrors.email" class="mt-2 text-sm text-red-500 flex items-center">
            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
            {{ validationErrors.email }}
          </p>
        </div>

        <div>
          <label for="password" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Contraseña
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input 
              id="password" 
              v-model="state.password" 
              type="password" 
              placeholder="••••••••" 
              class="block w-full pl-10 pr-3 py-3 bg-gray-50 dark:bg-gray-900 border rounded-xl focus:outline-none focus:ring-2 sm:text-sm text-gray-900 dark:text-white transition-all duration-200"
              :class="validationErrors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-800' : 'border-gray-200 dark:border-gray-700 focus:border-indigo-500 focus:ring-indigo-100 dark:focus:ring-indigo-900'"
            />
          </div>
          <p v-if="validationErrors.password" class="mt-2 text-sm text-red-500 flex items-center">
            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
            {{ validationErrors.password }}
          </p>
        </div>

        <div>
          <label for="avatar" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            URL del Avatar <span class="text-gray-400 font-normal">(Opcional)</span>
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <input 
              id="avatar" 
              v-model="state.avatar" 
              type="text" 
              placeholder="https://picsum.photos/200" 
              class="block w-full pl-10 pr-3 py-3 bg-gray-50 dark:bg-gray-900 border rounded-xl focus:outline-none focus:ring-2 sm:text-sm text-gray-900 dark:text-white transition-all duration-200"
              :class="validationErrors.avatar ? 'border-red-300 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-800' : 'border-gray-200 dark:border-gray-700 focus:border-indigo-500 focus:ring-indigo-100 dark:focus:ring-indigo-900'"
            />
          </div>
          <p v-if="validationErrors.avatar" class="mt-2 text-sm text-red-500 flex items-center">
            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
            {{ validationErrors.avatar }}
          </p>
        </div>

        <div v-if="error" class="p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-md flex items-start animate-pulse">
          <svg class="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          <p class="text-sm font-medium text-red-800 dark:text-red-300">{{ error }}</p>
        </div>

        <button 
          type="submit" 
          :disabled="isLoading"
          class="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5"
        >
          <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ isLoading ? 'Creando cuenta...' : 'Registrarse' }}
        </button>
        
        <p class="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          ¿Ya tienes una cuenta? 
          <NuxtLink to="/login" class="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 transition-colors">
            Inicia sesión
          </NuxtLink>
        </p>

      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { z } from 'zod';
import type { CreateUserDTO } from '../../infrastructure/Dtos/CreateUserDTO';

// Asumo que tienes este composable configurado
const { registerUser, isLoading, error } = useAuth();
const router = useRouter();

const state = reactive<CreateUserDTO>({
  name: '',
  email: '',
  password: '',
  avatar: 'https://picsum.photos/800'
});

const validationErrors = ref<Record<string, string>>({});

const schema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Debe ser un correo electrónico válido'),
  password: z.string().min(4, 'La contraseña debe tener al menos 4 caracteres'),
  avatar: z.string().url('Debe ser una URL válida')
});

const onSubmit = async () => {
  validationErrors.value = {};

  const result = schema.safeParse(state);

  if (!result.success) {
    result.error.issues.forEach(issue => {
      validationErrors.value[issue.path[0]] = issue.message;
    });
    return; 
  }

  const user = await registerUser(result.data);

  if (user) {
    router.push('/profile');
  }
};
</script>