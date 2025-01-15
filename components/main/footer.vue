<script setup lang="ts">
const { t, locale } = useI18n();

const { isSuccessPopup } = storeToRefs(useFormStore());

const contact = ref("");

const errorMessage = ref("");
const isDisabled = computed(() => !contact.value);
const isLoading = ref(false);

function clearFopm() {
  contact.value = "";
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
    section: "footer",
  });

  if (res?.status) {
    isSuccessPopup.value = true;
    clearFopm();
  } else {
    errorMessage.value = res?.message;
  }

  isLoading.value = false;
}
</script>

<template>
  <footer id="contacts">
    <GeneralSection>
      <GeneralContainer>
        <GeneralFlex column section>
          <GeneralFlex space>
            <GeneralFlex column>
              <GeneralTitle>{{ $t("home.footer.links-title") }}</GeneralTitle>
              <GeneralFlex column mini>
                <NuxtLink
                  :to="$t(`home.footer.path-${link}`)"
                  v-for="link in 4"
                  class="link-wrapper"
                >
                  <GeneralText big class="link">
                    {{ $t(`home.footer.link-${link}`) }}
                  </GeneralText>
                </NuxtLink>
              </GeneralFlex>
            </GeneralFlex>
            <GeneralFlex column>
              <GeneralTitle>{{
                $t("home.footer.contacts-title")
              }}</GeneralTitle>
              <GeneralFlex column>
                <NuxtLink
                  :to="$t(`home.footer.contact-path-${link}`)"
                  v-for="link in 3"
                  target="_blank"
                  class="link-wrapper"
                >
                  <GeneralFlex mini center>
                    <img
                      width="24"
                      height="24"
                      :src="$t(`home.footer.contact-img-${link}`)"
                      alt="img"
                      class="contact-img"
                    />
                    <GeneralText big class="link">
                      {{ $t(`home.footer.contact-${link}`) }}
                    </GeneralText>
                  </GeneralFlex>
                </NuxtLink>
              </GeneralFlex>
            </GeneralFlex>
            <GeneralFlex column class="form">
              <GeneralTitle>{{ $t("home.footer.form-title") }}</GeneralTitle>
              <GeneralText big>
                {{ $t("home.footer.form-text") }}
              </GeneralText>
              <GeneralFlex center>
                <div class="input-wrapper">
                  <GeneralInput
                    v-model="contact"
                    class="input"
                    type="text"
                    name="contact"
                    shadow
                    @input="input"
                    :placeholder="$t(`home.footer.form-placeholder`)"
                    autocomplete="email tel"
                  />
                </div>
                <GeneralButton
                  fit
                  @click="sendForm"
                  :class="{ disabled: isDisabled }"
                >
                  {{ $t("home.footer.form-button") }}
                </GeneralButton>
              </GeneralFlex>
              <Transition name="error">
                <GeneralText class="error" v-if="errorMessage">
                  {{ errorMessage }}
                </GeneralText>
              </Transition>
            </GeneralFlex>
          </GeneralFlex>
          <GeneralDivider />
          <GeneralFlex space>
            <GeneralText big>{{ $t("home.footer.copyright") }}</GeneralText>
            <Icon name="my:webswift" size="40" />
          </GeneralFlex>
        </GeneralFlex>
      </GeneralContainer>
    </GeneralSection>
  </footer>
</template>

<style scoped>
.link-wrapper {
  cursor: pointer;
  width: fit-content;
}

.link {
  transition: all 0.3s ease-in-out;
}

.contact-img {
  transition: all 0.3s ease-in-out;
}

.link-wrapper:hover {
  .link {
    color: var(--main);
  }

  .contact-img {
    transform: translateY(-0.25rem);
  }
}

.input-wrapper {
  width: 100%;
  position: relative;

  &::before {
    content: "";
    display: block;
    width: 24px;
    height: 24px;
    background: url("/img/main/contact.svg");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
  }
}

.input {
  padding-left: 3rem;
}

.form {
  max-width: 600px;
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
</style>
