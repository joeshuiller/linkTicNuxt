<template>
  <div class="article-card">
    
    <div>
      <img 
        :src="product.images[0] || 'https://via.placeholder.com/400'" 
        :alt="product.title" 
        class="w-full h-48 object-cover rounded-xl mb-4"
      >
      
      <h2 class="text-xl font-bold mb-2 text-gray-900 line-clamp-1">{{ product.title }}</h2>
      <p class="text-gray-600 mb-4 text-sm line-clamp-2">{{ product.description }}</p>
    </div>

    <div class="mt-auto">
      <div class="flex justify-between items-center mb-4">
          <span class="text-2xl font-extrabold text-indigo-600">${{ product.price }}</span>
          <span class="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md tracking-wide uppercase">
            {{ product.category.name }}
          </span>
      </div>
      
      <div class="actions">
        <button 
          type="button"  @click="addToCart(product)"
          class="w-full flex items-center justify-center py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-200 active:scale-95"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Agregar al carrito
        </button>
      </div>
    </div>        
    
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~~/app/core/entities/Product';

// 1. Usamos SOLO defineProps para registrar la propiedad que recibe el componente
const props = defineProps<{ 
  product: Product 
}>(); 

// 2. Traemos nuestra función del composable
const { addToCart } = useCart();  

// ELIMINADO: Todo el bloque "export default { ... }" ya que defineProps hace ese trabajo.
</script>

<style lang="scss" scoped>
.article-card {
  /* Hacemos que la tarjeta sea un flex column para empujar el botón siempre abajo */
  @apply flex flex-col h-full bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200;
}
</style>