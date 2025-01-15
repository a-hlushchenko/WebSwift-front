<script setup lang="ts">
import type { PageType } from "~/pages/admin/index.vue";

const authStore = useAuthStore();
const { user, token, refreshToken } = storeToRefs(authStore);

const props = defineProps<{ pages: PageType[] | null }>();
const emit = defineEmits(["refresh"]);

const isDeletePopup = ref(false);
const isEditPopup = ref(false);

const selectedPage = ref<PageType | null>(null);

const pagePopupTop = ref();

function openPage(pageId: number) {
  navigateTo(`/admin/page/${pageId}`);
}

function selectPage(page: PageType | null) {
  selectedPage.value = page;
}

function openPagePopup(e: Event, page: PageType, type: "edit" | "delete") {
  const target = (e.currentTarget as HTMLElement).getBoundingClientRect();

  const popupHeight = type === "edit" ? 222 : 116;
  const isTop = target.top <= window.innerHeight / 2;

  pagePopupTop.value = isTop
    ? target.bottom + window.scrollY
    : target.top + window.scrollY - popupHeight;

  selectedPage.value = page;

  if (type === "edit") {
    isEditPopup.value = true;
  } else {
    isDeletePopup.value = true;
  }
}

function closeEditPopup() {
  isEditPopup.value = false;
}

function closeDeletePopup() {
  isDeletePopup.value = false;
}
</script>

<template>
  <GeneralText v-if="!props.pages">No pages yet</GeneralText>

  <GeneralFlex column v-else>
    <GeneralBox
      :mini="['dev', 'owner'].includes(user!.role)"
      v-for="page in pages"
      style="cursor: pointer"
      @click="openPage(page.id)"
      class="box"
    >
      <GeneralFlex space center>
        <GeneralTitle small>{{ page.name }}</GeneralTitle>
        <GeneralFlex mini v-if="['dev', 'owner'].includes(user!.role)">
          <button class="opacity-hover">
            <Icon
              name="my:edit"
              size="32"
              @click.stop="openPagePopup($event, page, 'edit')"
            />
          </button>
          <button class="opacity-hover">
            <Icon
              name="my:delete"
              size="32"
              @click.stop="openPagePopup($event, page, 'delete')"
            />
          </button>
        </GeneralFlex>
      </GeneralFlex>
    </GeneralBox>
  </GeneralFlex>

  <AdminDel
    v-if="isDeletePopup"
    @close="closeDeletePopup"
    @refresh="$emit('refresh')"
    @selectPage="selectPage"
    :pagePopupTop="pagePopupTop"
    :selected="selectedPage"
    type="page"
  />

  <AdminEdit
    v-if="isEditPopup"
    @close="closeEditPopup"
    @refresh="$emit('refresh')"
    @selectPage="selectPage"
    :pagePopupTop="pagePopupTop"
    :selected="selectedPage"
    type="page"
  />
</template>

<style scoped>
.link {
  font-size: 1.5rem;

  &.big {
    line-height: 100%;
  }
}

.box:hover {
  border-color: var(--main);
}
</style>
