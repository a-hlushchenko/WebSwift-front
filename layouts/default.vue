<script setup>
const { t } = useI18n();
const head = useLocaleHead();

useHead({
  meta: [
    {
      name: "description",
      content: t("home.head.description"),
    },
  ],
});
</script>

<template>
  <div>
    <Html :lang="head.htmlAttrs?.lang" :dir="head.htmlAttrs?.dir">
      <div class="app-wrapper">
        <MainFormPopup />
        <MainHeader />
        <slot />
        <MainFooter />
      </div>
    </Html>
  </div>
</template>

<style scoped>
.app-wrapper {
  width: 100%;
  height: 100%;
}
</style>
