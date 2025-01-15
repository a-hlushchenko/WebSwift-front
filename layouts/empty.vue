<script setup lang="ts"></script>

<template>
  <div class="app">
    <slot />
  </div>
</template>

<style scoped>
.app {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
}
</style>
