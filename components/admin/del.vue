<script setup lang="ts">
import type { FieldType, PageType, SectionType } from "~/pages/admin/index.vue";

const props = defineProps<{
  selected: PageType | SectionType | FieldType | null;
  pagePopupTop: number;
  type: "page" | "section" | "field";
}>();
const emit = defineEmits(["close", "refresh", "select"]);

const authStore = useAuthStore();
const { user, token, refreshToken } = storeToRefs(authStore);
const notificationStore = useNotificationStore();

const isDeleteLoading = ref(false);

const popupRef = ref();

function closePopup() {
  if (popupRef.value) {
    popupRef.value.close();
  }
}

async function deletePage() {
  if (!props.selected || isDeleteLoading.value) return;

  isDeleteLoading.value = true;

  try {
    const data = await $fetch(
      `${import.meta.env.VITE_API_URL}/${props.type}/del/${props.selected.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token.value}`,
          "x-refresh-token": `${refreshToken.value}`,
        },
      }
    );

    if (data) {
      closePopup();

      notificationStore.showMessage(
        `"${props.selected.name}"  ${props.type} deleted successfully`
      );
      emit("select", null);
      emit("refresh");
    }
  } catch (error: any) {
    const message = error.response?._data?.message;
    if (message) {
      notificationStore.showMessage(message, NotificationType.error);
    } else {
      notificationStore.showMessage(
        "Something went wrong",
        NotificationType.error
      );
    }
    return false;
  } finally {
    isDeleteLoading.value = false;
  }
}
</script>

<template>
  <GeneralPopup
    ref="popupRef"
    @close="$emit('close')"
    :style="{
      top: `calc(${pagePopupTop}px)`,
      right: '1rem',
    }"
  >
    <GeneralFlex column center>
      <GeneralTitle mini>
        Delete "{{ selected?.name }}" {{ props.type }}?
      </GeneralTitle>
      <GeneralButton class="del-btn" @click="deletePage">
        <GeneralLoader v-if="isDeleteLoading" width="1rem" height="1rem" />
        <span v-else>Delete</span>
      </GeneralButton>
    </GeneralFlex>
  </GeneralPopup>
</template>

<style scoped>
.del-btn {
  background: red;
  color: var(--secondary-text);
}
</style>
