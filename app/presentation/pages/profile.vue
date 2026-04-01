<template>
  <div class="max-w-3xl mx-auto mt-12 p-4 sm:p-6 lg:p-8">
    
    <nav class="mb-6 flex text-sm text-gray-500 dark:text-gray-400">
      <NuxtLink to="/home" class="hover:text-brand-600 transition-colors">Catálogo</NuxtLink>
      <span class="mx-2">/</span>
      <span class="text-gray-900 dark:text-white font-medium">Mi Perfil</span>
    </nav>

    <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden relative">
      
      <div class="h-32 bg-gradient-to-r from-brand-500 to-blue-700"></div>

      <div class="px-6 pb-8">
        <div class="flex justify-between items-end -mt-12 mb-6">
          
          <img 
            :src="user?.avatar || 'https://ui-avatars.com/api/?name=User&background=random'" 
            alt="Avatar del usuario" 
            class="w-24 h-24 rounded-full border-4 border-white dark:border-gray-900 object-cover bg-gray-100 shadow-md"
          />

          <button 
            @click="logout"
            class="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:text-red-400 rounded-lg text-sm font-medium transition-colors border border-transparent flex items-center"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            Cerrar Sesión
          </button>
        </div>

        <div v-if="isLoading" class="animate-pulse mt-8 space-y-4">
          <div class="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
        </div>

        <div v-else-if="user">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ user.name }}</h1>
          <p class="text-gray-500 flex items-center mt-1">
            <svg class="w-4 h-4 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            {{ user.email }}
          </p>

          <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Rol</span>
              <p class="mt-1 font-medium text-gray-900 dark:text-white capitalize">{{ user.role }}</p>
            </div>
            <div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider">ID de Usuario</span>
              <p class="mt-1 font-medium text-gray-900 dark:text-white font-mono">#{{ user.id }}</p>
            </div>
          </div>
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
  title: 'Mi Perfil | Mi E-commerce'
});

onMounted(() => {
  fetchProfile();
});
</script>