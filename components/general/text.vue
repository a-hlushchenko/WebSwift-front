<script setup lang="ts">
const props = defineProps<{
  big?: boolean;
  center?: boolean;
  light?: boolean;
}>();
</script>

<template>
  <p class="text" :class="{ big, center, light }"><slot></slot></p>
</template>

<style scoped>
.text {
  font-size: 1rem;
  color: var(--text);
  line-height: 150%;
  font-weight: 500;
  text-align: start;

  span {
    color: var(--main);
  }
}

.big {
  font-size: 1.25rem;
}

.center {
  text-align: center;
}

.light {
  color: var(--secondary-text);
}
</style>
