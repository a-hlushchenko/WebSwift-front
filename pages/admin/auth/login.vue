<script setup lang="ts">
definePageMeta({
  layout: "empty",
  middleware: "guest",
});

const authStore = useAuthStore();

const login = ref("");
const password = ref("");

const errorMessage = ref("");
const isLogging = ref(false);

const disabled = computed(() => !login.value || !password.value);

function clearForm() {
  login.value = "";
  password.value = "";
}

async function handleLogin() {
  if (disabled.value || isLogging.value) return;

  isLogging.value = true;

  const res = await authStore.login({
    login: login.value,
    password: password.value,
  });

  if (res?.success) {
    await navigateTo("/admin");
    clearForm();
  } else {
    clearForm();
    errorMessage.value = res?.message;
  }

  isLogging.value = false;
}
</script>

<template>
  <GeneralFlex column center class="wrapper">
    <Icon name="my:logo" size="100" />
    <form @submit.prevent="handleLogin" class="form">
      <input type="text" class="input" placeholder="Login" v-model="login" />
      <input
        type="password"
        class="input"
        placeholder="Password"
        v-model="password"
      />
      <GeneralButton :disabled="disabled">
        <GeneralLoader v-if="isLogging" width="1rem" height="1rem" />
        <span v-else>Login</span>
      </GeneralButton>
      <span class="error" v-if="errorMessage">{{ errorMessage }}</span>
    </form>
  </GeneralFlex>
</template>

<style scoped lang="scss">
.wrapper {
  width: 100%;
}

.input {
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid var(--shade);
  width: 100%;
  transition: border-color 0.3s ease-in-out;

  &:focus-visible {
    border-color: var(--main);
  }
}

.form {
  width: 100%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  span {
    font-size: 1rem;
  }
}

.error {
  color: red;
  align-self: start;
}
</style>
