<script setup lang="ts">
const props = defineProps<{ mini?: boolean; fit?: boolean; more?: boolean }>();
</script>

<template>
  <button class="button" :class="{ mini, fit, more }">
    <slot></slot>
    <div class="more-icon" v-if="more"><IconsGeneralMore /></div>
  </button>
</template>

<style scoped lang="scss">
.button {
  padding: 0.75rem 1.5rem;
  background: var(--button);
  width: 100%;
  border-radius: 0.25rem;
  font-weight: 500;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.03);
  }

  &:disabled {
    background: var(--shade);

    &:hover {
      transform: none;
    }
  }

  &.more {
    padding: 0.5rem 0.5rem 0.5rem 1.25rem;

    &:hover {
      opacity: 1;
      gap: 1.75rem;
      transform: none;

      & .more-icon {
        transform: rotate(-45deg);
      }
    }
  }
}

.mini {
  padding: 0.5rem 1rem;
}

.fit {
  width: fit-content;
}

.more-icon {
  width: 28px;
  height: 28px;
  border-radius: 0.25rem;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
  transition: all 0.3s;
}
</style>
