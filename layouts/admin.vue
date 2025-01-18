<script setup lang="ts"></script>

<template>
  <div class="app">
    <AdminAside class="aside" />
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
@media all and (max-width: 767px) {
  .app {
    display: block;
  }
  .aside {
    display: none;
  }
}
</style>
