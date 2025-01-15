<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const authStore = useAuthStore();
</script>

<template>posts</template>
