<script setup lang="ts">
import "swiper/css";
import "./assets/css/index.css";
</script>

<template>
  <NuxtLayout>
    <NuxtPage
      :transition="{
        name: 'page',
        mode: 'out-in',
      }"
    />
  </NuxtLayout>
</template>

<style>
* {
  -webkit-tap-highlight-color: transparent;
}

::-webkit-scrollbar {
  background-color: var(--secondary-bg);
  width: 6px;
}

::-webkit-scrollbar-track {
  background: none;
}

::-webkit-scrollbar-thumb {
  background-color: var(--main);
  border-radius: 50px;
}

:root {
  scroll-behavior: smooth;
  background-color: var(--bg);
  --bg: #fff;
  --shade: #e3e3e3;
  --dark-shade: #232e3e;
  --text: #000;
  --secondary-bg: #111827;
  --secondary-text: #fff;
  --dark: rgba(42, 49, 65, 0.44);
  --main: #fb7d09;
  --success: #00d250;
  --light-success: #7fe8a7;
  --error: #d20000;
  --light-error: #e87f7f;
  --button: linear-gradient(91.02deg, #ffa800 0.49%, #fb7d09 110.72%);
  --header: 4rem;
}

::selection {
  background-color: var(--main);
  color: var(--text);
}

body {
  background-color: var(--bg);
  font-family: "sf pro", sans-serif;
  font-size: 16px;
  line-height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text);
  overflow-x: hidden;
  overscroll-behavior: none;
}

.opacity-hover {
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  line-height: 0;

  &:hover {
    opacity: 0.7;
  }
}

.popup-enter-from,
.popup-leave-to {
  transform: translate(0px, -1rem);
  opacity: 0;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  scale: 1.02;
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.3s;
}

.layout-enter-from {
  opacity: 0;
  transform: translate(50%, 0);
}

.layout-leave-to {
  opacity: 0;
  transform: translate(-50%, 0);
}
</style>
