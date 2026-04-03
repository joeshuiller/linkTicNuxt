<script setup lang="ts">
// Configuramos el SEO de la página principal
useHead({
  title: 'Inicio | LinkTicNuxt',
  meta: [
    { name: 'description', content: 'Bienvenido a la mejor tienda en línea. Descubre nuestros productos exclusivos.' }
  ]
})
</script>

<template>
  <div>
    <section class="bg-gray-50 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-50 to-white -z-10"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 flex flex-col items-center text-center">
        <h1 class="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
          Encuentra todo lo que necesitas <br class="hidden md:block" />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            en un solo lugar
          </span>
        </h1>
        
        <p class="mt-4 text-xl text-gray-600 max-w-2xl mb-10">
          Explora nuestro catálogo con los mejores productos, precios competitivos y envíos a todo el país. Calidad garantizada a un clic de distancia.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <NuxtLink to="/product" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-blue-500/30 flex items-center justify-center">
            Ver Catálogo
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </NuxtLink>
          
          <NuxtLink to="/nosotros" class="bg-white hover:bg-gray-50 text-gray-800 font-semibold px-8 py-4 rounded-xl border border-gray-200 transition-all shadow-sm flex items-center justify-center">
            Saber más
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900">¿Por qué elegirnos?</h2>
          <p class="mt-4 text-gray-600">Trabajamos para ofrecerte la mejor experiencia de compra.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div class="bg-gray-50 rounded-2xl p-8 text-center hover:-translate-y-1 transition-transform duration-300">
            <div class="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Calidad Premium</h3>
            <p class="text-gray-600">Todos nuestros productos pasan por estrictos controles de calidad.</p>
          </div>

          <div class="bg-gray-50 rounded-2xl p-8 text-center hover:-translate-y-1 transition-transform duration-300">
            <div class="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Envíos Rápidos</h3>
            <p class="text-gray-600">Entregas seguras y veloces directo a la puerta de tu casa.</p>
          </div>

          <div class="bg-gray-50 rounded-2xl p-8 text-center hover:-translate-y-1 transition-transform duration-300">
            <div class="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Pago Seguro</h3>
            <p class="text-gray-600">Múltiples métodos de pago con encriptación de extremo a extremo.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>