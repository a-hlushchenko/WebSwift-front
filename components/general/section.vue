<script setup lang="ts">
const props = defineProps<{ dark?: boolean }>();
</script>

<template>
  <div class="section" :class="{ dark }"><slot></slot></div>
</template>

<style scoped>
.section {
  padding: 5rem 0;
  background-color: var(--bg);
  position: relative;
  scroll-margin-top: var(--header);
}

.dark {
  background-color: var(--secondary-bg);
}
</style>
