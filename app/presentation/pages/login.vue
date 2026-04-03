<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
    <div class="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
      
      <div class="px-8 py-10 text-center bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div class="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 shadow-md">
           <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
        </div>
        <h1 class="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Bienvenido de nuevo</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">Ingresa tus credenciales para acceder</p>
      </div>

      <form @submit.prevent="onSubmit" class="p-8 space-y-6">
        
        <div>
          <label for="login-email" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Correo Electrónico
          </label>
          <input 
            id="login-email" 
            v-model="state.email" 
            type="email" 
            placeholder="tu@correo.com" 
            class="block w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border rounded-xl focus:outline-none focus:ring-2 sm:text-sm text-gray-900 dark:text-white transition-all"
            :class="validationErrors.email ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-blue-100'"
          />
          <p v-if="validationErrors.email" class="mt-2 text-sm text-red-500">{{ validationErrors.email }}</p>
        </div>

        <div>
          <label for="login-password" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Contraseña
          </label>
          <input 
            id="login-password" 
            v-model="state.password" 
            type="password" 
            placeholder="••••••••" 
            class="block w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border rounded-xl focus:outline-none focus:ring-2 sm:text-sm text-gray-900 dark:text-white transition-all"
            :class="validationErrors.password ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-blue-100'"
          />
          <p v-if="validationErrors.password" class="mt-2 text-sm text-red-500">{{ validationErrors.password }}</p>
        </div>

        <div v-if="error" class="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-md">
          <p class="text-sm font-medium text-red-800">{{ error }}</p>
        </div>

        <button 
          type="submit" 
          @click.prevent="onSubmit"
          :disabled="isLoading"
          class="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-70 transition-all"
        >
          {{ isLoading ? 'Verificando...' : 'Iniciar Sesión' }}
        </button>
        
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { z } from 'zod';
import type { LoginDTO } from '../../infrastructure/Dtos/LoginDTO';

definePageMeta({
  middleware: ['guest']
});

const { loginUser, isLoading, error } = useLogin();

const state = reactive<LoginDTO>({
  email: '',
  password: ''
});

const validationErrors = ref<Record<string, string>>({});

const schema = z.object({
  email: z.string().min(1, 'El correo es obligatorio').email('Formato inválido'),
  password: z.string().min(1, 'La contraseña es obligatoria')
});

const onSubmit = async () => {
  validationErrors.value = {}; 
  const result = schema.safeParse(state);

  if (!result.success) {
    result.error.issues.forEach((issue: any) => {
      validationErrors.value[issue.path[0]] = issue.message;
    });
    return;
  }
  
  const success = await loginUser(result.data);

  if (success) {
    await navigateTo('/profile');
  }
};
</script>