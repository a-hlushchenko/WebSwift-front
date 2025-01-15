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

const isEditLoading = ref(false);

const editName = ref("");
const editSlug = ref("");
const editType = ref("");

const popupRef = ref();

function closePopup() {
  if (popupRef.value) {
    popupRef.value.close();
  }
}

function clearEditForm() {
  editName.value = "";
  editSlug.value = "";
  editType.value = "";
}

watchEffect(() => {
  if (!props.selected) return;
  editName.value = props.selected.name;
  editSlug.value = props.selected.slug;

  if ("type" in props.selected) {
    editType.value = props.selected.type;
  }
});

async function editPage() {
  if (!props.selected || isEditLoading.value) return;

  isEditLoading.value = true;

  try {
    const data = await $fetch(
      `${import.meta.env.VITE_API_URL}/${props.type}/edit/${props.selected.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token.value}`,
          "x-refresh-token": `${refreshToken.value}`,
        },
        body: {
          name: editName.value,
          slug: editSlug.value,
          type: editType.value ? editType.value : undefined,
        },
      }
    );

    if (data) {
      notificationStore.showMessage(
        `"${props.selected.name}" ${props.type} edited successfully`
      );

      emit("refresh");
    }
  } catch (error: any) {
    closePopup();
    const message = error.response?._data?.message;
    if (message) {
      notificationStore.showMessage(message, NotificationType.error);
    } else {
      notificationStore.showMessage(
        "Something went wrongs",
        NotificationType.error
      );
    }
    return false;
  } finally {
    closePopup();
    emit("select", null);
    isEditLoading.value = false;
    clearEditForm();
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
    <GeneralTitle mini>
      Edit "{{ selected?.name }}" {{ props.type }}
    </GeneralTitle>
    <form @submit.prevent="editPage">
      <GeneralFlex column mini>
        <GeneralInput
          type="string"
          placeholder="Name"
          name="name"
          v-model="editName"
        />
        <GeneralInput
          type="string"
          placeholder="Slug"
          name="slug"
          v-model="editSlug"
        />

        <GeneralSelect v-model="editType" v-if="type === 'field'">
          <option>text</option>
          <option>file</option>
        </GeneralSelect>

        <GeneralButton>
          <GeneralLoader v-if="isEditLoading" width="1rem" height="1rem" />
          <span v-else>Edit</span>
        </GeneralButton>
      </GeneralFlex>
    </form>
  </GeneralPopup>
</template>

<style scoped>
.del-btn {
  background: red;
  color: var(--secondary-text);
}
</style>
