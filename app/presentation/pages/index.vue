<script setup lang="ts">
useHead({
    title: 'Catálogo de Productos | LinkTicNuxt',
    meta: [
        { name: 'description', content: 'Encuentra los mejores productos en nuestra tienda.' }
    ]
})
const { products, isLoading, error, fetchProducts } = useProducts();

// Cargamos los datos al montar el componente en cliente o durante SSR
await useAsyncData('products', async () => {
    await fetchProducts(); // 1. Ejecutamos el caso de uso que llena el estado
    return products.value; // 2. ¡RETORNAMOS el valor para que Nuxt lo cachee!
});
</script>

<template>
    <div class="container">
        <div class="content">
            <h1 class="text-3xl font-bold mb-6">Catálogo de Productos</h1>
            <main>
                <!-- Estado de Carga -->
                <div v-if="isLoading" class="text-center py-10">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p class="mt-4 text-gray-600">Cargando productos...</p>
                </div>

                <!-- Estado de Error -->
                <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                    role="alert">
                    <strong class="font-bold">Error:</strong>
                    <span class="block sm:inline"> {{ error }}</span>
                </div>
                <ArticleCard v-else
                v-for="product in products"
                :key="product.id"
                :slug="product.slug"
                :title="product.title"
                :author="product.author"
                :date="product.date"
                :category="product.category"
                :description="product.description"
                :images="product.images"
                :price="product.price"
                />
            </main>
        </div>
    </div>
</template>
<style lang="scss">
.container {
  @apply m-auto;
}
.container .content {
  @apply flex flex-col justify-center items-center sm:p-2 md:p-4 lg:p-8 xl:p-16;
  main {
    @apply max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6;
  }
}
</style>