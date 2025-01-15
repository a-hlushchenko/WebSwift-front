<script setup lang="ts">
const props = defineProps<{ style?: Record<string, string>; top?: boolean }>();

const emit = defineEmits(["close"]);

const bodyVisible = ref(true);

function close() {
  bodyVisible.value = false;
}

defineExpose({ close });

onMounted(() => {
  document.body.style.overflow = "hidden";
});

onUnmounted(() => {
  document.body.style.overflow = "auto";
});
</script>

<template>
  <div class="popup-wrapper" @click.stop="close"></div>

  <Transition name="popup" appear @after-leave="$emit('close')">
    <GeneralBox
      shadow
      class="popup"
      :class="{ top }"
      :style="style"
      @click.stop
      v-if="bodyVisible"
    >
      <button class="close-btn" @click="close">
        <Icon name="my:close" size="32" />
      </button>
      <GeneralFlex column>
        <slot></slot>
      </GeneralFlex>
    </GeneralBox>
  </Transition>
</template>

<style scoped>
.popup-wrapper {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
}

.popup {
  position: absolute;
  max-width: 400px;
  top: calc(100% + 1rem);
  z-index: 11;
}

.close-btn {
  position: absolute;
  background-color: var(--bg);
  right: 1rem;
  top: 1rem;
}

.popup-enter-from,
.popup-leave-to {
  transform: translate(0px, -1rem);
  opacity: 0;
}

.top {
  top: unset;
  bottom: 100%;
}
</style>
