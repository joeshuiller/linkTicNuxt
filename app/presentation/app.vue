<script setup lang="ts">
  useHead({
    htmlAttrs: {
      lang: 'es'
    }
  })
</script>
<template>
  <NavBar />
  <NuxtPage />
  <NuxtRouteAnnouncer />
  <FootBar />
</template>