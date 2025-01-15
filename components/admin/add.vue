<script setup lang="ts">
const props = defineProps<{
  type: "page" | "section" | "field";
  pageId?: number;
  sectionId?: number;
}>();
const emit = defineEmits(["close", "refresh"]);

const authStore = useAuthStore();
const { user, token, refreshToken } = storeToRefs(authStore);
const notificationStore = useNotificationStore();

const addName = ref("");
const addSlug = ref("");

const addType = ref("text");

const popupRef = ref();
const elRef = ref();
const isBottom = ref(false);

function checkPosition() {
  if (elRef.value) {
    const rect = elRef.value.getBoundingClientRect();
    console.log(rect);
    const viewportHeight = window.innerHeight;
    console.log(viewportHeight);
    isBottom.value = rect.top > viewportHeight / 2;
    console.log(isBottom.value);
  }
}

function closePopup() {
  if (popupRef.value) {
    popupRef.value.close();
  }
}

const isAddDisabled = computed(() => !addName.value || !addSlug.value);
const isAddLoading = ref(false);

function clearAddForm() {
  addName.value = "";
  addSlug.value = "";
}

async function add() {
  if (isAddDisabled.value || isAddLoading.value) return;

  isAddLoading.value = true;

  const bodyType = props.type === "field" ? addType.value : undefined;

  try {
    const data = await $fetch(
      `${import.meta.env.VITE_API_URL}/${props.type}/add`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.value}`,
          "x-refresh-token": `${refreshToken.value}`,
        },
        body: {
          name: addName.value,
          slug: addSlug.value,
          page_id: props.pageId,
          section_id: props.sectionId,
          type: bodyType,
        },
      }
    );

    if (data) {
      closePopup();
      notificationStore.showMessage(
        `"${addName.value}" ${props.type} added successfully`
      );
      clearAddForm();
      emit("refresh");
    }
  } catch (error: any) {
    const message = error.response?._data?.message;
    notificationStore.showMessage(message, NotificationType.error);
    return false;
  } finally {
    isAddLoading.value = false;
  }
}

onMounted(() => {
  checkPosition();
});
</script>

<template>
  <GeneralPopup ref="popupRef" @close="$emit('close')" :top="isBottom">
    <GeneralTitle>Add {{ props.type }}</GeneralTitle>
    <form @submit.prevent="add" ref="elRef">
      <GeneralFlex column mini>
        <GeneralInput
          type="string"
          placeholder="Name"
          name="name"
          v-model="addName"
        />
        <GeneralInput
          type="string"
          placeholder="Slug"
          name="slug"
          v-model="addSlug"
        />
        <GeneralSelect v-model="addType" v-if="type === 'field'">
          <option selected>text</option>
          <option>file</option>
        </GeneralSelect>

        <!-- <GeneralInput
            v-if="addType === 'text'"
            type="string"
            placeholder="en value"
            name="envalue"
            v-model="addEnValue"
          />

          <GeneralInput
            v-if="addType === 'text'"
            type="string"
            placeholder="ua value"
            name="uavalue"
            v-model="addUaValue"
          />

          <GeneralInput
            v-if="addType === 'file'"
            type="file"
            name="uavalue"
            v-model="addFile"
          /> -->

        <GeneralButton :disabled="isAddDisabled">
          <GeneralLoader v-if="isAddLoading" width="1rem" height="1rem" />
          <span v-else>Add</span>
        </GeneralButton>
      </GeneralFlex>
    </form>
  </GeneralPopup>
</template>

<style scoped></style>
