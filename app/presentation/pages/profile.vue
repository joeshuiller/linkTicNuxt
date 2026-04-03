<template>
  <div class="max-w-3xl mx-auto mt-12 p-4 sm:p-6 lg:p-8 min-h-screen">
    
    <nav class="mb-6 flex text-sm text-gray-500 dark:text-gray-400">
      <NuxtLink to="/" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Catálogo</NuxtLink>
      <span class="mx-2">/</span>
      <span class="text-gray-900 dark:text-white font-medium">Mi Perfil</span>
    </nav>

    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden relative">
      
      <div class="h-32 bg-gradient-to-r from-indigo-500 to-indigo-700"></div>

      <div class="px-6 pb-8">
        <div class="flex justify-between items-end -mt-12 mb-6">
          
          <img 
            :src="user?.avatar || 'https://ui-avatars.com/api/?name=User&background=random'" 
            alt="Avatar del usuario" 
            class="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 object-cover bg-gray-100 shadow-md"
          />

          <button 
            @click="logout"
            class="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:text-red-400 rounded-xl text-sm font-bold transition-colors border border-transparent flex items-center shadow-sm"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            Cerrar Sesión
          </button>
        </div>

        <div v-if="isLoading" class="animate-pulse mt-8 space-y-4">
          <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded-md w-1/3"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-1/4"></div>
          <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
             <div class="h-20 bg-gray-100 dark:bg-gray-700/50 rounded-xl"></div>
             <div class="h-20 bg-gray-100 dark:bg-gray-700/50 rounded-xl"></div>
          </div>
        </div>

        <div v-else-if="user">
          <h1 class="text-3xl font-extrabold text-gray-900 dark:text-white">{{ user.name }}</h1>
          <p class="text-gray-500 dark:text-gray-400 flex items-center mt-2 font-medium">
            <svg class="w-5 h-5 mr-1.5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            {{ user.email }}
          </p>

          <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-5 rounded-xl bg-gray-50 dark:bg-gray-700/30 border border-gray-100 dark:border-gray-700/50 hover:border-indigo-100 dark:hover:border-indigo-900 transition-colors">
              <span class="text-xs font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider">Rol de Cuenta</span>
              <p class="mt-1 font-semibold text-lg text-gray-900 dark:text-white capitalize">{{ user.role }}</p>
            </div>
            
            <div class="p-5 rounded-xl bg-gray-50 dark:bg-gray-700/30 border border-gray-100 dark:border-gray-700/50 hover:border-indigo-100 dark:hover:border-indigo-900 transition-colors">
              <span class="text-xs font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider">ID de Usuario</span>
              <p class="mt-1 font-semibold text-lg text-gray-900 dark:text-white font-mono tracking-tight">#{{ user.id }}</p>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-8">
          <div class="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
            <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          </div>
          <h3 class="text-lg font-bold text-gray-900 dark:text-white">No pudimos cargar tu información</h3>
          <p class="text-gray-500 mt-2 text-sm">Tu sesión podría haber expirado o hay un problema de conexión.</p>
          <button @click="logout" class="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors">
            Volver a Iniciar Sesión
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

const { user, isLoading, fetchProfile, logout } = useProfile();

definePageMeta({
  middleware: ['auth']
});

useHead({
  title: 'Mi Perfil | LinkTicNuxt'
});

onMounted(async () => {
  console.log("🚀 Solicitando perfil a la API...");
  await fetchProfile();
  console.log("✅ Datos recibidos en la vista:", user.value);
});
</script>