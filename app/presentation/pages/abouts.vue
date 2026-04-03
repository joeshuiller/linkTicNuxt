<script setup lang="ts">
// Configuramos el SEO de la página de nosotros
useHead({
  title: 'Nosotros | LinkTicNuxt',
  meta: [
    { name: 'description', content: 'Conoce más sobre nuestra historia, nuestra misión y el equipo detrás de LinkTicNuxt.' }
  ]
})
</script>

<template>
  <div class="bg-white">
    <section class="bg-blue-600 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Sobre Nosotros
        </h1>
        <p class="text-xl text-blue-100 max-w-2xl mx-auto">
          Conectando a las personas con los mejores productos a través de tecnología innovadora y un servicio excepcional.
        </p>
      </div>
    </section>

    <section class="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl font-bold text-gray-900 mb-6">Nuestra Historia</h2>
          <p class="text-gray-600 mb-4 leading-relaxed">
            LinkTicNuxt nació con una idea simple: hacer que las compras en línea sean más rápidas, seguras y accesibles para todos. Lo que comenzó como un pequeño proyecto de pasión, hoy se ha convertido en una plataforma confiable en la que confían miles de usuarios todos los días.
          </p>
          <p class="text-gray-600 leading-relaxed mb-6">
            Nuestra visión es seguir innovando, utilizando las últimas tecnologías web para ofrecerte una experiencia de usuario impecable, desde el momento en que buscas un producto hasta que llega a la puerta de tu casa.
          </p>
          <NuxtLink to="/productos" class="text-blue-600 font-semibold hover:text-blue-800 flex items-center transition-colors">
            Explora nuestro catálogo
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>
        </div>
        
        <div class="relative h-64 sm:h-80 md:h-96 bg-gray-200 rounded-2xl overflow-hidden shadow-lg flex items-center justify-center">
          <div class="absolute inset-0 bg-gradient-to-tr from-blue-100 to-gray-50"></div>
          <svg class="w-24 h-24 text-blue-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
    </section>

    <section class="bg-gray-50 py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">Lo que nos define</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
              <span class="font-bold text-xl">🚀</span>
            </div>
            <h3 class="font-bold text-gray-900 mb-2">Innovación</h3>
            <p class="text-gray-600 text-sm">Buscamos siempre mejorar usando la tecnología más moderna.</p>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
              <span class="font-bold text-xl">🤝</span>
            </div>
            <h3 class="font-bold text-gray-900 mb-2">Confianza</h3>
            <p class="text-gray-600 text-sm">Transparencia total en cada transacción y comunicación.</p>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
              <span class="font-bold text-xl">⭐</span>
            </div>
            <h3 class="font-bold text-gray-900 mb-2">Calidad</h3>
            <p class="text-gray-600 text-sm">Solo ofrecemos productos que superan nuestros estándares.</p>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
              <span class="font-bold text-xl">❤️</span>
            </div>
            <h3 class="font-bold text-gray-900 mb-2">Empatía</h3>
            <p class="text-gray-600 text-sm">Nuestros clientes son el centro de todo lo que hacemos.</p>
          </div>

        </div>
      </div>
    </section>

    <section class="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900">Conoce a nuestro equipo</h2>
        <p class="mt-4 text-gray-600">Las personas detrás de la magia de LinkTicNuxt.</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="text-center">
          <div class="w-32 h-32 mx-auto bg-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <span class="text-white text-3xl font-bold">AL</span>
          </div>
          <h3 class="text-xl font-bold text-gray-900">Ana López</h3>
          <p class="text-blue-600 font-medium text-sm">CEO & Fundadora</p>
        </div>

        <div class="text-center">
          <div class="w-32 h-32 mx-auto bg-indigo-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <span class="text-white text-3xl font-bold">CG</span>
          </div>
          <h3 class="text-xl font-bold text-gray-900">Carlos Gómez</h3>
          <p class="text-blue-600 font-medium text-sm">Director de Tecnología</p>
        </div>

        <div class="text-center">
          <div class="w-32 h-32 mx-auto bg-teal-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <span class="text-white text-3xl font-bold">MR</span>
          </div>
          <h3 class="text-xl font-bold text-gray-900">María Rodríguez</h3>
          <p class="text-blue-600 font-medium text-sm">Líder de Producto</p>
        </div>
      </div>
    </section>
  </div>
</template>