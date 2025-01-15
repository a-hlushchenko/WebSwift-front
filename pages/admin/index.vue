<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const authStore = useAuthStore();
const { user, token, refreshToken } = storeToRefs(authStore);

const isAddPopup = ref(false);

export interface FieldType {
  id: number;
  name: string;
  slug: string;
  type: "text" | "file";
  value_en?: string;
  value_ua?: string;
  file?: File | null;
  file_url?: string;
}

export interface SectionType {
  id: number;
  name: string;
  slug: string;
  fields: FieldType[];
}

export interface PageType {
  id: number;
  name: string;
  slug: string;
  sections: SectionType[] | null;
}

const { data: pages, refresh: refreshPages } = await useFetch<PageType[]>(
  `${import.meta.env.VITE_API_URL}/page/get-all`,
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
    <GeneralFlex space center class="heading">
      <GeneralFlex center style="position: relative; width: 100%">
        <GeneralTitle>Pages</GeneralTitle>
        <Icon
          name="my:add"
          size="40"
          class="opacity-hover"
          v-if="['dev', 'owner'].includes(user!.role)"
          @click="openAddPopup"
        />

        <AdminAdd
          v-if="isAddPopup"
          @close="closeAddPopup"
          @refresh="refreshPages"
          type="page"
        />
      </GeneralFlex>

      <NuxtLink to="/admin/posts" class="item">
        <GeneralBox>
          <GeneralTitle small fit-height>Posts</GeneralTitle>
        </GeneralBox>
      </NuxtLink>
    </GeneralFlex>

    <AdminPagesPageList :pages="pages" @refresh="refreshPages" />
  </GeneralFlex>
</template>

<style scoped></style>
