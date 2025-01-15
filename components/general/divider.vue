<script setup lang="ts">
defineProps<{ dashed?: boolean }>();
</script>

<template>
  <div class="divider">
    <span v-for="n in 6" :key="n" v-if="dashed"></span>
    <span v-else></span>
  </div>
</template>

<style scoped>
.divider {
  height: 2px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;

  span {
    height: 2px;
    width: 100%;
    background-color: var(--main);
    border-radius: 1rem;
  }
}
</style>
