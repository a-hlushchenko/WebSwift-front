export default defineI18nLocale(async (locale) => {
  const loc = await $fetch(`${import.meta.env.VITE_API_URL}/content/${locale}`);

  return loc;
});
