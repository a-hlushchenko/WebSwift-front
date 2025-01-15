<script setup lang="ts">
const { setLocale, locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const formStore = useFormStore();

function openForm() {
  formStore.setInitiator("Header");
  formStore.openForm();
}
</script>

<template>
  <header class="header-wrapper">
    <GeneralContainer>
      <GeneralFlex center space>
        <GeneralFlex big>
          <GeneralButton @click="openForm">
            {{ $t("home.header.button") }}
          </GeneralButton>
          <GeneralFlex class="header-lang-list" center>
            <NuxtLink
              :href="switchLocalePath(loc.code)"
              v-for="loc in locales"
              class="header-lang"
              :class="{ active: locale === loc.code }"
            >
              {{ loc.name }}
            </NuxtLink>
          </GeneralFlex>
        </GeneralFlex>

        <NuxtLink to="/" aria-label="Home">
          <Icon name="my:webswift" size="40" />
        </NuxtLink>

        <GeneralFlex big>
          <NuxtLink
            class="header-link"
            :to="$t(`home.header.link-${link}`)"
            v-for="link in 5"
          >
            {{ $t(`home.header.name-${link}`) }}
          </NuxtLink>
        </GeneralFlex>
      </GeneralFlex>
    </GeneralContainer>

    <svg
      style="position: absolute"
      width="0"
      height="0"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="headerFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.3"
            numOctaves="1"
            seed="0"
            stitchTiles="stitch"
            result="feTurbulence-391ac80d"
          ></feTurbulence>
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="2"
            edgeMode="duplicate"
            result="feGaussianBlur-85e146a6"
          ></feGaussianBlur>
          <feDisplacementMap
            in="feGaussianBlur-85e146a6"
            in2="feTurbulence-391ac80d"
            scale="37"
            xChannelSelector="A"
            yChannelSelector="A"
          ></feDisplacementMap>
        </filter>
      </defs>
    </svg>
  </header>
</template>

<style scoped>
.header-wrapper {
  padding: 0.5rem;
  position: sticky;
  z-index: 10;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  top: 0px;
  backdrop-filter: url(#headerFilter);
  -webkit-backdrop-filter: url(#headerFilter);
  height: var(--header);
}

.header-lang {
  font-size: 1.25rem;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.3s ease-in-out;

  &.active {
    cursor: default;
    color: var(--main);
  }

  &:not(.active):hover {
    color: var(--main);
  }
}

.header-link {
  font-size: 1.25rem;
  font-weight: 500;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: var(--main);
  }
}
</style>
