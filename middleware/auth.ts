import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";
import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();

  await authStore.fetchUser();

  if (!authStore.isAuthenticated) {
    return navigateTo("/admin/auth/login");
  }
});
