<script setup lang="ts">
const { cartItems, cartTotalPrice, removeFromCart, updateQuantity } = useCart();

useHead({
  title: 'Mi Carrito | LinkTicNuxt'
});
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
    <h1 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">Carrito de Compras</h1>

    <div v-if="cartItems.length === 0" class="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div class="w-24 h-24 bg-indigo-50 dark:bg-gray-700 text-indigo-300 dark:text-gray-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      </div>
      <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Tu carrito está vacío</h2>
      <p class="text-gray-500 dark:text-gray-400 mb-6">Parece que aún no has agregado ningún producto.</p>
      <NuxtLink to="/product" class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
        Explorar productos
      </NuxtLink>
    </div>

    <div v-else class="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
      
      <div class="lg:col-span-8">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          
          <li v-for="item in cartItems" :key="item.product.id" class="p-4 sm:p-6 flex items-center">
            <img :src="item.product.images[0] || 'https://via.placeholder.com/150'" :alt="item.product.title" class="w-24 h-24 object-cover rounded-xl border border-gray-100 dark:border-gray-700" />
            
            <div class="ml-6 flex-1 flex flex-col justify-between">
              <div class="sm:flex sm:justify-between sm:items-start">
                <div>
                  <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                    <NuxtLink :to="`/productos/${item.product.slug}`" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                      {{ item.product.title }}
                    </NuxtLink>
                  </h3>
                  <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ item.product.category.name }}</p>
                </div>
                <p class="mt-2 sm:mt-0 text-lg font-bold text-gray-900 dark:text-white sm:text-right">
                  ${{ (item.product.price * item.quantity).toFixed(2) }}
                </p>
              </div>

              <div class="mt-4 flex items-center justify-between">
                <div class="flex items-center border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900">
                  <button @click="updateQuantity(item.product.id, item.quantity - 1)" class="p-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" /></svg>
                  </button>
                  <span class="px-4 text-sm font-semibold text-gray-900 dark:text-white">{{ item.quantity }}</span>
                  <button @click="updateQuantity(item.product.id, item.quantity + 1)" class="p-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
                  </button>
                </div>

                <button @click="removeFromCart(item.product.id)" class="text-sm font-medium text-red-500 hover:text-red-700 dark:hover:text-red-400 flex items-center transition-colors">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  Eliminar
                </button>
              </div>
            </div>
          </li>

        </ul>
      </div>

      <div class="lg:col-span-4 mt-8 lg:mt-0">
        <div class="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 sm:p-8">
          <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-6">Resumen del pedido</h2>
          
          <dl class="space-y-4 text-sm text-gray-600 dark:text-gray-400">
            <div class="flex justify-between">
              <dt>Subtotal</dt>
              <dd class="font-medium text-gray-900 dark:text-white">${{ cartTotalPrice.toFixed(2) }}</dd>
            </div>
            <div class="flex justify-between">
              <dt>Envío estimado</dt>
              <dd class="font-medium text-gray-900 dark:text-white">Gratis</dd>
            </div>
            <div class="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
              <dt class="text-base font-bold text-gray-900 dark:text-white">Total a Pagar</dt>
              <dd class="text-lg font-extrabold text-indigo-600 dark:text-indigo-400">${{ cartTotalPrice.toFixed(2) }}</dd>
            </div>
          </dl>

          <div class="mt-6">
            <button class="w-full bg-indigo-600 border border-transparent rounded-xl shadow-sm py-3 px-4 text-base font-bold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
              Proceder al Pago
            </button>
          </div>
          
          <div class="mt-4 text-center">
            <NuxtLink to="/productos" class="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 transition-colors">
              o continuar comprando &rarr;
            </NuxtLink>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>