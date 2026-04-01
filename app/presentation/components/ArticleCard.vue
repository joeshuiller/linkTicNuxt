<template>
  <div class="article-card">
    <img :src="images[0]" :alt="title" class="w-full h-48 object-cover rounded mb-4">
    <h2 class="text-xl font-semibold mb-2">{{ title }}</h2>
    <p class="text-gray-600 mb-4">{{ description }}</p>
    <div class="flex justify-between items-center">
        <span class="text-2xl font-bold text-green-600">${{ price }}</span>
        <span class="text-sm text-gray-500">{{ category.name }}</span>
    </div>
    <div class="actions">
      <a class="btn">Ir al post</a>
    </div>        
  </div>
</template>

<script>
export default {
  name: 'ArticleCard',
  props: {
    slug: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    author: {
      type: String,
      default: '',
    },
    date: {
      type: Date,
      default: '',
    },
    category: {
      type: Object,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    images: {
      type: Array,
      default: '',
    },
    price: {
      type: Number,
      default: '',  
    },
  }
}
</script>

<style lang="scss" scoped>
.article-card {
  @apply block bg-white sm:border sm:rounded-lg p-4;
  h2 {
    @apply font-bold text-xl mb-2 mt-0;
  }
  figure {
    img {
      @apply w-full;
    }
  }
  p {
    @apply my-4 font-serif;
  }
  div.actions {
    @apply flex gap-2;
    .btn {
      @apply w-full text-center border rounded-full px-8 py-2 bg-gray-200 hover:bg-gray-300;
    }
  }
}
</style>