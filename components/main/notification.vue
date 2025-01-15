<script setup lang="ts">
const notificationStore = useNotificationStore();
</script>

<template>
  <Transition name="notification">
    <div
      class="notification"
      :class="{
        success: notificationStore.type === NotificationType.success,
        error: notificationStore.type === NotificationType.error,
      }"
      v-if="notificationStore.message"
    >
      {{ notificationStore.message }}
    </div>
  </Transition>
</template>

<style scoped>
.notification {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  padding: 0.75rem;
  border-radius: 0.75rem;
  border: 1px solid var(--success);
  font-weight: 500;
  transition: all 0.3s ease-in-out;
  background-color: var(--light-success);
  width: fit-content;
  max-width: 400px;
  height: fit-content;
  transition: all 0.3s ease-in-out;
  line-height: 1.5rem;

  &.error {
    border-color: var(--error);
    background-color: var(--light-error);
  }
}

.notification-enter-from,
.notification-leave-to {
  transform: translate(0px, 1rem);
  opacity: 0;
}
</style>
