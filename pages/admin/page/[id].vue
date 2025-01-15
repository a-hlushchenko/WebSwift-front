<script setup lang="ts">
import type { PageType } from "../index.vue";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const notificationStore = useNotificationStore();

const { setLocale, locale } = useI18n();

const route = useRoute();
const pageId = computed(() => route.params.id);

const authStore = useAuthStore();
const { user, token, refreshToken } = storeToRefs(authStore);

const isAddPopup = ref(false);

const { data: page, refresh: refreshPage } = await useFetch<PageType>(
  `${import.meta.env.VITE_API_URL}/section/get-all/${pageId.value}/${
    locale.value
  }`,
  {
    headers: {
      Authorization: `Bearer ${token.value}`,
      "x-refresh-token": `${refreshToken.value}`,
    },
  }
);

function openAddPopup() {
  isAddPopup.value = true;
}

function closeAddPopup() {
  isAddPopup.value = false;
}
</script>

<template>
  <GeneralFlex column big>
    <GeneralFlex space center>
      <GeneralFlex center style="position: relative; width: 100%">
        <GeneralTitle>{{ page?.name }} page</GeneralTitle>
        <Icon
          name="my:add"
          size="40"
          class="opacity-hover"
          v-if="['dev', 'owner'].includes(user!.role)"
          @click="openAddPopup"
        />

        <AdminAdd
          :pageId="page?.id"
          v-if="isAddPopup"
          @close="closeAddPopup"
          @refresh="refreshPage"
          type="section"
        />
      </GeneralFlex>

      <GeneralFlex class="header-lang-list" center>
        <button
          class="header-lang"
          :class="{ active: locale === 'en' }"
          @click="setLocale('en')"
        >
          EN
        </button>
        <button
          class="header-lang"
          :class="{ active: locale === 'ua' }"
          @click="setLocale('ua')"
        >
          UA
        </button>
      </GeneralFlex>
    </GeneralFlex>

    <AdminPagesPage :page="page" @refresh="refreshPage" />
  </GeneralFlex>
</template>

<style scoped>
.header-lang {
  font-size: 1.25rem;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.3s ease-in-out;

  &.active {
    cursor: default;
    color: var(--main);
  }

  &:not(.active):hover {
    color: var(--main);
  }
}

.header-link {
  font-size: 1.25rem;
  font-weight: 500;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: var(--main);
  }
}
</style>
