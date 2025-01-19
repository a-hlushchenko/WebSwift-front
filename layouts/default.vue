<script setup>
const { t } = useI18n();
const head = useLocaleHead();

useSeoMeta({
  description: t("home.head.description"),
  ogTitle: "WebSwift",
  ogDescription: t("home.head.description"),
  ogType: "website",
  ogImage: "https://web-swift.co/logo.png",
  ogUrl: "https://web-swift.co",
  logo: "https://web-swift.co/favicon.ico",
  twitterTitle: "WebSwift",
  twitterDescription: t("home.head.description"),
  twitterImage: "https://web-swift.co/logo.png",
});

useHead({
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico",
    },
  ],
  logo: "https://web-swift.co/favicon.ico",
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
