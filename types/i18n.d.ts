import "nuxt/app";

declare module "nuxt/app" {
  interface NuxtApp {
    $i18n: {
      finalizePendingLocaleChange?: () => void;
      waitForPendingLocaleChange?: () => Promise<void>;
    };
  }
}
