export const useFormStore = defineStore("form", () => {
  const isFormPopup = ref(false);
  const isSuccessPopup = ref(false);
  const initiatorSection = ref("");

  function openForm() {
    isFormPopup.value = true;
  }

  function setInitiator(initiator: string) {
    initiatorSection.value = initiator;
  }

  return {
    isFormPopup,
    isSuccessPopup,
    openForm,
    initiatorSection,
    setInitiator,
  };
});
