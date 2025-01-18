h
<script setup lang="ts">
const props = defineProps<{
  mini?: boolean;
  small?: boolean;
  big?: boolean;
  section?: boolean;
  column?: boolean;
  space?: boolean;
  center?: boolean;
  wfull?: boolean;
}>();
</script>

<template>
  <div
    class="flex"
    :class="{ mini, column, space, center, small, big, wfull, section }"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
.flex {
  display: flex;
  gap: 1rem;
}

.mini {
  gap: 0.5rem;
}

.small {
  gap: 0.25rem;
}

.center {
  align-items: center;
}

.column {
  flex-direction: column;
}

.big {
  gap: 2rem;
}

.section {
  gap: 3.5rem;
}

.space {
  justify-content: space-between;
}

.wfull {
  width: 100%;
}

@media all and (max-width: 1200px) {
  .flex {
    /* gap: 0.75rem; */
  }

  .mini {
    gap: 0.5rem;
  }

  .small {
    gap: 0.25rem;
  }

  .big {
    gap: 1.5rem;
  }

  .section {
    gap: 2rem;
  }
}
</style>
