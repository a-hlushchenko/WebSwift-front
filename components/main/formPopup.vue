<script setup lang="ts">
const { t, locale } = useI18n();

const { isFormPopup, isSuccessPopup, initiatorSection } = storeToRefs(
  useFormStore()
);

const contact = ref("");
const message = ref("");

const errorMessage = ref("");
const isDisabled = computed(() => !contact.value);
const isLoading = ref(false);

function close() {
  isFormPopup.value = false;
  isSuccessPopup.value = false;
  clearFopm();
}

function clearFopm() {
  contact.value = "";
  message.value = "";
  errorMessage.value = "";
}

function input() {
  if (!isDisabled.value) {
    errorMessage.value = "";
  }
}

function checkFopm() {
  if (!isDisabled.value) return;
  else {
    errorMessage.value = t("home.form.error");
  }
}

async function sendForm() {
  checkFopm();

  if (isDisabled.value || isLoading.value) return;

  isLoading.value = true;

  const res = await sendFeedback({
    lang: locale.value,
    contact: contact.value,
    message: message.value,
    section: initiatorSection.value,
  });

  if (res?.status) {
    close();
    setTimeout(() => {
      isSuccessPopup.value = true;
    }, 300);
    clearFopm();
  } else {
    errorMessage.value = res?.message;
  }

  isLoading.value = false;
}
</script>

<template>
  <Transition name="popup">
    <div
      class="popup-wrapper"
      v-if="isFormPopup || isSuccessPopup"
      @click="close"
    >
      <GeneralBox big class="popup" shadow @click.stop v-if="isFormPopup">
        <button class="close-btn" @click="close">
          <Icon name="my:close" size="32" />
        </button>

        <GeneralFlex column>
          <GeneralTitle>{{ $t("home.form.title") }}</GeneralTitle>
          <GeneralText big class="text">{{ $t("home.form.text") }}</GeneralText>
          <div class="input-wrapper contact">
            <GeneralInput
              v-model="contact"
              class="input"
              type="text"
              id="form-contact"
              name="form-contact"
              shadow
              :placeholder="$t(`home.form.contact-placeholder`)"
              autocomplete="email tel"
              @input="input"
            />
          </div>
          <div class="input-wrapper message">
            <GeneralInput
              v-model="message"
              class="input"
              type="text"
              name="message"
              id="message"
              shadow
              textarea
              :placeholder="$t(`home.form.message-placeholder`)"
            />
          </div>
          <div>
            <Transition name="error">
              <GeneralText class="error" v-if="errorMessage">
                {{ errorMessage }}
              </GeneralText>
            </Transition>
          </div>
          <GeneralFlex space center>
            <GeneralButton @click="sendForm" :class="{ disabled: isDisabled }">
              <GeneralLoader v-if="isLoading" width="24px" height="24px" />
              <span v-else>{{ $t("home.form.button") }}</span>
            </GeneralButton>
            <NuxtLink to="/#contacts" @click="close" class="contact-yourself">
              {{ $t("home.form.contact-yourself") }}
            </NuxtLink>
          </GeneralFlex>
        </GeneralFlex>
      </GeneralBox>
      <GeneralBox
        v-else-if="isSuccessPopup"
        class="popup success"
        shadow
        @click.stop
      >
        <button class="close-btn" @click="close">
          <Icon name="my:close" size="32" />
        </button>

        <GeneralFlex column center mini>
          <IconsGeneralSuccess />
          <GeneralTitle>{{ $t("home.form.success-title") }}</GeneralTitle>
          <GeneralText big class="success-text">{{
            $t("home.form.success-text")
          }}</GeneralText>
        </GeneralFlex>
      </GeneralBox>
    </div>
  </Transition>
</template>

<style scoped>
.popup-wrapper {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(1rem);
  -webkit-backdrop-filter: blur(1rem);
  z-index: 15;
  padding: 1rem;
  transition: all 0.3s ease-in-out;
}

.popup {
  position: relative;
  width: fit-content;
}

.popup-enter-from,
.popup-leave-to {
  background-color: transparent;
  backdrop-filter: blur(0rem);
  -webkit-backdrop-filter: blur(0rem);
}

.popup-enter-from .popup,
.popup-leave-to .popup {
  transform: scale(0.5);
}

.text {
  max-width: 500px;
}

.input {
  padding: 1rem;
  font-size: 1.12rem;

  padding-left: 3rem;
}

.input-wrapper {
  width: 100%;
  position: relative;

  &::before {
    content: "";
    display: block;
    width: 24px;
    height: 24px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    position: absolute;
    left: 1rem;
    top: 1rem;
  }

  &.contact::before {
    background-image: url("/img/main/contact.svg");
  }

  &.message::before {
    background-image: url("/img/main/message.svg");
  }
}

.close-btn {
  position: absolute;
  background-color: var(--bg);
  right: 1.5rem;
  top: 1.5rem;
  transition: opacity 0.3s ease-in-out;

  &:hover {
    opacity: 0.5;
  }
}

.disabled {
  opacity: 0.7;

  &:hover {
    transform: none;
  }
}

.error {
  max-height: 2lh;
  overflow: hidden;
  color: var(--error);
  transition: all 0.5s;
}

.error-enter-from,
.error-leave-to {
  max-height: 0lh;
}

.contact-yourself {
  color: var(--main);
  width: 100%;
  text-align: end;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }
}
.success {
  width: 350px;
  min-height: 350px;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.success-text {
  max-width: 300px;
  text-align: center;
}
</style>
