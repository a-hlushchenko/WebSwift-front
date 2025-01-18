<script setup>
const { t } = useI18n();
const head = useLocaleHead();

useSeoMeta({
  description: t("home.head.description"),
  ogTitle: "WebSwift",
  ogDescription: t("home.head.description"),
  ogImage: "https://web-swift.co/logo.png",
  twitterTitle: "WebSwift",
  twitterDescription: t("home.head.description"),
  twitterImage: "http://web-swift.co/logo.png",
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
