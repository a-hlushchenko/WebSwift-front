<script setup lang="ts">
const model = defineModel();
</script>

<template>
  <GeneralBox mini class="select-wrapper">
    <select v-model="model" class="select">
      <slot></slot>
    </select>
  </GeneralBox>
</template>

<style scoped>
.select-wrapper {
  padding: 0;
  padding-right: 0.75rem;
}

.select {
  width: 100%;
  padding: 0.75rem;
}
</style>
