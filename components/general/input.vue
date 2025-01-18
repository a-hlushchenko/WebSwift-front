<script setup lang="ts">
const props = defineProps<{ shadow?: boolean; textarea?: boolean }>();
const model = defineModel<any>();
</script>

<template>
  <textarea
    v-if="textarea"
    class="input textarea"
    :class="{ shadow }"
    v-model="model"
    maxlength="400"
  ></textarea>
  <input v-else @click.stop class="input" :class="{ shadow }" v-model="model" />
</template>

<style scoped>
.input {
  border-radius: 0.75rem;
  background-color: var(--light);
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--shade);
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &.shadow {
    border-color: transparent;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);

    &:focus-visible {
      box-shadow: 0px 0px 10px rgba(251, 125, 9, 0.7);
    }
  }

  &:focus-visible {
    border-color: var(--main);
  }
}

.textarea {
  field-sizing: content;
  word-break: break-word;
  line-height: 125%;
  min-height: calc(4lh + 1.5rem);
}
</style>
