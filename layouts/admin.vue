<script setup lang="ts"></script>

<template>
  <div class="app">
    <AdminAside />
    <MainNotification />
    <div class="pages">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.app {
  display: grid;
  grid-template-columns: 250px 1fr;
}

.pages {
  padding: 1rem;
  overflow: auto;
  height: 100vh;
}
</style>
