<script setup lang="ts">
const { t } = useI18n();

const formStore = useFormStore();

function openForm() {
  formStore.setInitiator("Hero");
  formStore.openForm();
}
</script>

<template>
  <GeneralSection class="hero-wrapper">
    <GeneralContainer class="home">
      <div class="hero">
        <GeneralFlex column class="hero-content">
          <GeneralTitle h1>{{ $t("home.hero.title") }}</GeneralTitle>
          <GeneralDivider dashed />
          <GeneralText big>{{ $t("home.hero.text") }}</GeneralText>
          <GeneralButton fit @click="openForm">{{
            $t("home.hero.button")
          }}</GeneralButton>
        </GeneralFlex>
        <IconsHomeHero style="width: 100%; height: 100%" />
      </div>
    </GeneralContainer>

    <NuxtLink to="/#about" aria-label="About">
      <IconsHomeMouse class="hero-mouse" />
    </NuxtLink>
  </GeneralSection>
</template>

<style scoped>
.hero-wrapper {
  height: calc(100vh - var(--header));
  position: sticky;
  top: var(--header);
}

.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 1rem;
  height: 100%;
  justify-content: space-between;
}

.hero-content {
  max-width: 560px;
}

.hero-mouse {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  cursor: pointer;
  transform: translate(-50%, 0);
  animation: mouse 3s linear infinite;
}

@keyframes mouse {
  from,
  to {
    transform: translateX(0rem);
  }

  50% {
    transform: translateY(0.5rem);
  }
}
</style>
