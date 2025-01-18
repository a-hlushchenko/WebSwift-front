<script setup lang="ts">
const props = defineProps<{
  h1?: boolean;
  h2?: boolean;
  small?: boolean;
  mini?: boolean;
  center?: boolean;
  fitHeight?: boolean;
  light?: boolean;
}>();
</script>

<template>
  <h1 v-if="h1" class="title h1" :class="{ center, fitHeight, light }">
    <slot></slot>
  </h1>
  <h2 v-else-if="h2" class="title h2" :class="{ center, fitHeight, light }">
    <slot></slot>
  </h2>
  <strong
    v-else
    class="title"
    :class="{ center, mini, small, fitHeight, light }"
    ><slot></slot
  ></strong>
</template>

<style>
.title {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 125%;
  text-align: start;

  span {
    color: var(--main);
  }
}

.h1,
.h2 {
  font-size: 2rem;
}

.small {
  font-weight: 500;
  font-size: 1.5rem;
}

.mini {
  font-weight: 500;
  font-size: 1.25rem;
}

.center {
  text-align: center;
}

.fitHeight {
  line-height: 100%;
}

.light {
  color: var(--secondary-text);
}

@media all and (max-width: 1200px) {
  .title {
    font-size: 1.12rem;
  }

  .h1,
  .h2 {
    font-size: 1.5rem;
  }
}
</style>
