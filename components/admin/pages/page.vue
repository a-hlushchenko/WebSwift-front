<script setup lang="ts">
import type { PageType, SectionType } from "~/pages/admin/index.vue";
const { locale, finalizePendingLocaleChange } = useI18n();

const authStore = useAuthStore();
const { user, token, refreshToken } = storeToRefs(authStore);

const notificationStore = useNotificationStore();

const props = defineProps<{ page: PageType | null }>();
const emit = defineEmits(["refresh"]);

const isDeletePopup = ref(false);
const isEditPopup = ref(false);

const selectedSection = ref<SectionType | null>(null);
const openedSection = ref<SectionType | null>(null);

const pagePopupTop = ref();

const fieldsOverflow = ref(false);

function selectSection(section: SectionType | null) {
  selectedSection.value = section;
}

function changeSection(section: SectionType) {
  fieldsOverflow.value = false;
  if (section === openedSection.value) {
    openedSection.value = null;
    return;
  }

  openedSection.value = section;
  setTimeout(() => {
    fieldsOverflow.value = true;
  }, 300);
}

function openSectionPopup(
  e: Event,
  section: SectionType,
  type: "edit" | "delete"
) {
  const target = (e.currentTarget as HTMLElement).getBoundingClientRect();

  const popupHeight = type === "edit" ? 222 : 116;
  const isTop = target.top <= window.innerHeight / 2;

  pagePopupTop.value = isTop
    ? target.bottom + window.scrollY
    : target.top + window.scrollY - popupHeight;

  selectedSection.value = section;

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

async function save() {
  if (!props.page?.sections) return;

  const formData = new FormData();

  props.page.sections.forEach((section) => {
    section.fields.forEach((field) => {
      formData.append(`fields[${field.id}][id]`, field.id.toString());
      formData.append(`fields[${field.id}][type]`, field.type);

      if (field.type === "text") {
        formData.append(
          `fields[${field.id}][value]`,
          field[`value_${locale.value}`] || ""
        );
      } else if (field.type === "file" && field.file) {
        formData.append(`field_${field.id}`, field.file);
      }
    });
  });

  formData.append("lang", locale.value);

  try {
    const data = await $fetch(
      `${import.meta.env.VITE_API_URL}/field/update-all`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token.value}`,
          "x-refresh-token": `${refreshToken.value}`,
        },
        body: formData,
      }
    );

    if (data) {
      notificationStore.showMessage(`Fields updated successfully`);
      emit("refresh");
    }
  } catch (error: any) {
    const message = error.response?._data?.message;
    notificationStore.showMessage(message, NotificationType.error);
    return false;
  }
}

onBeforeMount(async () => {
  await finalizePendingLocaleChange();
});
</script>

<template>
  <GeneralText v-if="!props.page?.sections || !props.page.sections[0]">
    No sections yet
  </GeneralText>

  <GeneralFlex column v-else>
    <GeneralBox
      :mini="['dev', 'owner'].includes(user!.role)"
      v-for="section in page?.sections"
      style="cursor: pointer"
      class="section"
      @click="changeSection(section)"
      :class="{ active: section === openedSection }"
    >
      <GeneralFlex space center>
        <GeneralTitle small>{{ section.name }}</GeneralTitle>
        <GeneralFlex mini v-if="['dev', 'owner'].includes(user!.role)">
          <button class="opacity-hover">
            <Icon
              name="my:edit"
              size="32"
              @click.stop="openSectionPopup($event, section, 'edit')"
            />
          </button>
          <button class="opacity-hover">
            <Icon
              name="my:delete"
              size="32"
              @click.stop="openSectionPopup($event, section, 'delete')"
            />
          </button>
        </GeneralFlex>
      </GeneralFlex>

      <div class="fields-wrapper">
        <GeneralFlex
          column
          mini
          class="fields"
          :class="{ active: fieldsOverflow }"
        >
          <AdminSectionsFieldList
            :section="section"
            @refresh="emit('refresh')"
          />
        </GeneralFlex>
      </div>
    </GeneralBox>
    <GeneralFlex center>
      <GeneralButton class="cancel action-button" @click="$emit('refresh')">
        Cancel
      </GeneralButton>
      <GeneralButton class="action-button" @click="save">Save</GeneralButton>
    </GeneralFlex>
  </GeneralFlex>

  <AdminDel
    v-if="isDeletePopup"
    @close="closeDeletePopup"
    @refresh="$emit('refresh')"
    @select="selectSection"
    :pagePopupTop="pagePopupTop"
    :selected="selectedSection"
    type="section"
  />

  <AdminEdit
    v-if="isEditPopup"
    @close="closeEditPopup"
    @refresh="$emit('refresh')"
    @select="selectSection"
    :pagePopupTop="pagePopupTop"
    :selected="selectedSection"
    type="section"
  />
</template>

<style scoped>
.fields-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: all 0.3s;
}

.fields {
  overflow: hidden;
}

.section.active .fields-wrapper {
  grid-template-rows: 1fr;

  .fields.active {
    overflow: unset;
  }
}

.action-button {
  width: 25%;

  &.cancel {
    background: var(--light-error);
  }
}

.section:hover {
  border-color: var(--main);
}
</style>
