<script setup lang="ts">
const props = defineProps<{
  id?: number;
  imgUrl?: string;
}>();

const emit = defineEmits(["updateUrl", "updateFile"]);

const fileName = ref<string | null>("");

const element = ref();

const handleFileUpload = (event: Event) => {
  const target = event.target;
  if (
    target instanceof HTMLInputElement &&
    target.type === "file" &&
    target.files
  ) {
    const uploadedFile = target.files?.[0];
    if (uploadedFile) {
      console.log("success");
      emit("updateFile", props.id, uploadedFile);
      emit("updateUrl", props.id, URL.createObjectURL(uploadedFile));
      fileName.value = target.files[0].name;
    }
  }
};
</script>

<template>
  <input
    v-show="false"
    @click.stop
    class="input"
    type="file"
    :id="String(id)"
    @change="handleFileUpload"
    ref="element"
  />
  <label :for="String(id)" class="input" @click.stop>
    <GeneralButton
      mini
      type="button"
      class="upload-file"
      @click.prevent="element.click()"
    >
      {{ fileName ? "Change image" : "Upload image" }}
    </GeneralButton>
    <span class="file-name">{{ fileName || "No image chosen" }}</span>
  </label>
  <img v-if="imgUrl" :src="imgUrl" class="img" alt="image" />
</template>

<style scoped>
.input {
  border-radius: 0.75rem;
  background-color: var(--light);
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--shade);
  transition: border-color 0.3s ease-in-out;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &:focus-visible {
    border-color: var(--main);
  }
}

.img {
  max-width: 100%;
  max-height: 400px;
  width: fit-content;
  border-radius: 1rem;
  object-fit: contain;
}

.upload-file {
  width: fit-content;
}

.file-name {
  font-weight: 400;
}
</style>
