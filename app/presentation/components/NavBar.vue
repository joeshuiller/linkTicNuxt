<script setup lang="ts">
import { ref } from 'vue';

// Estado para controlar el menú móvil
const isMobileMenuOpen = ref(false);

// Función para alternar el menú
const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// Traemos el estado de autenticación y el carrito
const auth = useLogin();
const { cartTotalItems } = useCart(); // ✨ Extraemos el total de items
</script>

<template>
    <nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                
                <div class="flex items-center">
                    <NuxtLink to="/" class="flex-shrink-0 flex items-center gap-2">
                        <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span class="text-white font-bold text-xl">L</span>
                        </div>
                        <span class="font-bold text-xl text-gray-900">LinkTicNuxt</span>
                    </NuxtLink>
                </div>

                <div class="hidden md:flex md:items-center md:space-x-8">
                    <NuxtLink to="/" class="text-gray-600 hover:text-blue-600 transition-colors font-medium" active-class="text-blue-600 border-b-2 border-blue-600 pb-1">
                        Inicio
                    </NuxtLink>
                    <NuxtLink to="/product" class="text-gray-600 hover:text-blue-600 transition-colors font-medium" active-class="text-blue-600 border-b-2 border-blue-600 pb-1">
                        Catálogo
                    </NuxtLink>
                    <NuxtLink to="/abouts" class="text-gray-600 hover:text-blue-600 transition-colors font-medium" active-class="text-blue-600 border-b-2 border-blue-600 pb-1">
                        Nosotros
                    </NuxtLink>

                    <NuxtLink to="/carrito" class="relative p-2 text-gray-600 hover:text-blue-600 transition-colors" aria-label="Ver carrito">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span 
                            v-if="cartTotalItems > 0" 
                            class="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white"
                        >
                            {{ cartTotalItems }}
                        </span>
                    </NuxtLink>
                    
                    <NuxtLink v-if="!auth.isAuthenticated.value" to="/login" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                        Iniciar Sesión
                    </NuxtLink>
                    <NuxtLink v-else to="/profile" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                        Perfil
                    </NuxtLink>
                </div>

                <div class="flex items-center md:hidden">
                    <button 
                        @click="toggleMobileMenu"
                        type="button" 
                        class="text-gray-600 hover:text-gray-900 focus:outline-none p-2"
                        aria-label="Abrir menú"
                    >
                        <svg v-if="!isMobileMenuOpen" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <svg v-else class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <div v-show="isMobileMenuOpen" class="md:hidden border-t border-gray-200 bg-gray-50">
            <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <NuxtLink 
                    to="/" 
                    @click="isMobileMenuOpen = false"
                    class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                    active-class="text-blue-700 bg-blue-50"
                >
                    Inicio
                </NuxtLink>
                <NuxtLink 
                    to="/product" 
                    @click="isMobileMenuOpen = false"
                    class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                    active-class="text-blue-700 bg-blue-50"
                >
                    Catálogo
                </NuxtLink>
                <NuxtLink 
                    to="/abouts" 
                    @click="isMobileMenuOpen = false"
                    class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                    active-class="text-blue-700 bg-blue-50"
                >
                    Nosotros
                </NuxtLink>

                <NuxtLink 
                    to="/carrito" 
                    @click="isMobileMenuOpen = false"
                    class="flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                    active-class="text-blue-700 bg-blue-50"
                >
                    <div class="flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Carrito
                    </div>
                    <span 
                        v-if="cartTotalItems > 0" 
                        class="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full"
                    >
                        {{ cartTotalItems }}
                    </span>
                </NuxtLink>

                <NuxtLink 
                    v-if="!auth.isAuthenticated.value"
                    to="/login" 
                    @click="isMobileMenuOpen = false"
                    class="block w-full text-center mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                    Iniciar Sesión
                </NuxtLink>
                <NuxtLink 
                    v-else
                    to="/profile" 
                    @click="isMobileMenuOpen = false"
                    class="block w-full text-center mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                    Perfil
                </NuxtLink>
            </div>
        </div>
    </nav>
</template>