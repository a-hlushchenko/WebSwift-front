<script setup lang="ts"></script>

<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0px 1.5rem;
  height: 100%;
}

@media all and (max-width: 767px) {
  .container {
    padding: 0px 1rem;
  }
}
</style>
