<script setup lang="ts">
import type { FieldType, SectionType } from "~/pages/admin/index.vue";

const props = defineProps<{
  section: SectionType;
}>();
const emit = defineEmits(["refresh"]);

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const { locale } = useI18n();

const isAddPopup = ref(false);
const isDeletePopup = ref(false);
const isEditPopup = ref(false);

const selectedField = ref<FieldType | null>(null);

const pagePopupTop = ref();

function openAddPopup() {
  isAddPopup.value = true;
}

function closeAddPopup() {
  isAddPopup.value = false;
}

function selectField(field: FieldType | null) {
  selectedField.value = field;
}

function openFieldPopup(e: Event, field: FieldType, type: "edit" | "delete") {
  const target = (e.currentTarget as HTMLElement).getBoundingClientRect();

  const popupHeight = type === "edit" ? 277 : 116;
  const isTop = target.top <= window.innerHeight / 2;

  pagePopupTop.value = isTop
    ? target.bottom + window.scrollY
    : target.top + window.scrollY - popupHeight;

  selectedField.value = field;

  if (type === "edit") {
    isEditPopup.value = true;
  } else {
    isDeletePopup.value = true;
  }
}

function closeDeletePopup() {
  isDeletePopup.value = false;
}
function closeEditPopup() {
  isEditPopup.value = false;
}

function updateUrl(id: number, url: string) {
  const field = props.section.fields.find((field) => id === field.id);

  if (!field) return;

  field.file_url = url;
}

function updateFile(id: number, file: File) {
  const field = props.section.fields.find((field) => id === field.id);

  if (!field) return;

  field.file = file;
}
</script>

<template>
  <GeneralFlex center mini class="fields-heading">
    <GeneralTitle mini>Fields</GeneralTitle>
    <Icon
      name="my:add"
      size="32"
      class="opacity-hover"
      v-if="['dev', 'owner'].includes(user!.role)"
      @click.stop="openAddPopup"
    />

    <AdminAdd
      v-if="isAddPopup"
      @close="closeAddPopup"
      @refresh="emit('refresh')"
      type="field"
      :sectionId="section.id"
    />
  </GeneralFlex>
  <GeneralFlex column mini>
    <GeneralText v-if="!props.section.fields[0]">No fields yet</GeneralText>

    <GeneralFlex column mini v-for="field in props.section.fields" v-else>
      <GeneralFlex center space :style="{ alignItems: 'end' }">
        <GeneralText fit>{{ field.name }}</GeneralText>
        <GeneralFlex mini v-if="['dev', 'owner'].includes(user!.role)">
          <button class="opacity-hover">
            <Icon
              name="my:edit"
              size="32"
              @click.stop="openFieldPopup($event, field, 'edit')"
            />
          </button>
          <button class="opacity-hover">
            <Icon
              name="my:delete"
              size="32"
              @click.stop="openFieldPopup($event, field, 'delete')"
            />
          </button>
        </GeneralFlex>
      </GeneralFlex>

      <GeneralInput
        v-if="field.type === 'text'"
        :type="field.type"
        placeholder="text"
        v-model="field[`value_${locale}`]"
        :id="field.id"
      />

      <GeneralFile
        v-else-if="field.type === 'file'"
        :id="field.id"
        :imgUrl="field.file_url"
        @updateUrl="updateUrl"
        @updateFile="updateFile"
      />
    </GeneralFlex>
  </GeneralFlex>

  <AdminDel
    v-if="isDeletePopup"
    @close="closeDeletePopup"
    @refresh="$emit('refresh')"
    @select="selectField"
    :pagePopupTop="pagePopupTop"
    :selected="selectedField"
    type="field"
  />

  <AdminEdit
    v-if="isEditPopup"
    @close="closeEditPopup"
    @refresh="$emit('refresh')"
    @select="selectField"
    :pagePopupTop="pagePopupTop"
    :selected="selectedField"
    type="field"
  />
</template>

<style scoped>
.fields-heading {
  position: relative;
  width: 100%;
  padding-top: 1rem;
}
</style>
