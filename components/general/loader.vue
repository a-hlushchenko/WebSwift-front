<script setup lang="ts"></script>

<template>
  <svg
    class="loader"
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.9999 4C20.4334 4 22.8249 4.63432 24.9385 5.84041C27.0521 7.0465 28.8149 8.7827 30.0529 10.8778C31.2909 12.9729 31.9614 15.3544 31.9983 17.7877C32.0352 20.2209 31.4372 22.6218 30.2633 24.7534C29.0894 26.8851 27.3802 28.6739 25.3041 29.9436C23.228 31.2132 20.8569 31.9198 18.4245 31.9936C15.9921 32.0674 13.5825 31.5059 11.4332 30.3644C9.284 29.223 7.46943 27.541 6.16846 25.4845"
      stroke="black"
      stroke-width="3"
      stroke-linecap="round"
    />
  </svg>
</template>

<style scoped>
.loader {
  animation: loader linear infinite 1s;
  stroke: var(--text);
}

@keyframes loader {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
