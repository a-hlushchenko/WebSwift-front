<script setup lang="ts">
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const route = useRoute();

const links = [
  {
    path: "/admin",
    name: "Content",
    icon: "my:content",
    roles: ["dev", "editor", "owner"],
  },
  {
    path: "/admin/users",
    name: "Users",
    icon: "my:users-icon",
    roles: ["owner"],
  },
];

const filteredLinks = computed(() =>
  links.filter((link) => user.value && link.roles.includes(user.value.role))
);

function logout() {
  authStore.logout();
  navigateTo("/admin/auth/login");
}
</script>

<template>
  <aside class="aside">
    <div class="aside-heading">
      <NuxtLink to="/">
        <Icon name="my:logo" size="80" />
      </NuxtLink>
      <button class="logout-icon" @click="logout">
        <Icon name="my:logout" size="20" class="logout-icon" />
      </button>
    </div>
    <GeneralFlex column wfull mini>
      <NuxtLink
        :to="link.path"
        class="aside-item"
        :class="{ active: route.path === link.path }"
        v-for="link in filteredLinks"
        style="color: var(--bg)"
      >
        <Icon :name="link.icon" size="24" />
        <span>{{ link.name }}</span>
      </NuxtLink>
    </GeneralFlex>
  </aside>
</template>

<style lang="scss">
.aside {
  background-color: var(--secondary-bg);
  position: sticky;
  top: 0px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 2rem;
  align-items: center;
}

.aside-heading {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logout-icon {
  position: absolute;
  top: 0;
  right: 0;
}

.aside-item {
  font-weight: 500;
  font-size: 1.25rem;
  background-color: #232e3e;
  color: var(--secondary-text);
  border: 1px solid transparent;
  border-radius: 0.75rem;
  padding: 0.75rem 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: border-color 0.3s ease-in-out;

  &:hover,
  &.active {
    border-color: var(--main);
  }
}

.logout-icon {
  path {
    transition: fill 0.3s ease-in-out;
  }
  &:hover path {
    fill: var(--main);
  }
}
</style>
