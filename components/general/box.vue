<script setup lang="ts">
const props = defineProps<{
  shadow?: boolean;
  mini?: boolean;
  dark?: boolean;
  big?: boolean;
}>();
</script>

<template>
  <div class="box" :class="{ shadow, mini, dark, big }"><slot></slot></div>
</template>

<style scoped>
.box {
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid var(--shade);
  font-weight: 500;
  transition: all 0.3s ease-in-out;
  background-color: var(--bg);
  width: 100%;
}

.dark {
  background-color: var(--dark);
  backdrop-filter: blur(1rem);
  -webkit-backdrop-filter: blur(1rem);
  border: none;
}

.shadow {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border: none;
}

.mini {
  padding: 0.75rem;
}

.big {
  padding: 1.5rem;
}

@media all and (max-width: 1200px) {
  .big {
    padding: 1rem;
  }
}
</style>
