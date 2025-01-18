<script setup lang="ts">
const { setLocale, locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const formStore = useFormStore();

const isMenu = ref(false);

function openMenu() {
  isMenu.value = true;
}

function closeMenu() {
  isMenu.value = false;
}

watchEffect(() => {
  if (isMenu.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
});

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
          <GeneralButton @click="openForm" class="header-button">
            {{ $t("home.header.button") }}
          </GeneralButton>
          <div class="menu-icon header-button-mobile" @click="openForm">
            <img src="/img/main/contact.svg" alt="" width="20" />
          </div>
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

        <NuxtLink to="/" aria-label="Home" class="header-logo-wrapper">
          <Icon name="my:webswift" size="40" class="header-logo" />
        </NuxtLink>

        <GeneralFlex big class="links-list" :class="{ active: isMenu }">
          <NuxtLink
            class="header-link"
            :to="$t(`home.header.link-${link}`)"
            v-for="link in 5"
          >
            {{ $t(`home.header.name-${link}`) }}
          </NuxtLink>
          <GeneralFlex class="menu-bottom" column>
            <GeneralDivider />
            <GeneralFlex center>
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
        </GeneralFlex>

        <div class="menu-icon" @click="isMenu = !isMenu">
          <span v-for="n in 3"></span>
        </div>
      </GeneralFlex>
    </GeneralContainer>

    <Transition name="menu-wrapper">
      <div v-if="isMenu" class="menu-wrapper" @click="closeMenu"></div>
    </Transition>

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
  padding: 0.5rem 0;
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

.menu-icon {
  z-index: 1;
  width: 40px;
  height: 40px;
  background-color: var(--bg);
  border: 2px solid var(--main);
  border-radius: 50%;
  gap: 2px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  display: none;

  span {
    display: block;
    height: 2px;
    border-radius: 10px;
    background-color: var(--main);
    width: 50%;
  }
}

.menu-wrapper {
  height: calc(100vh - var(--header));
  width: 100%;
  position: fixed;
  top: var(--header);
  z-index: -1;
  left: 0;
  background-color: #0000003d;
  transition: all 0.3s ease-in-out;
}

.menu-wrapper-enter-from,
.menu-wrapper-leave-to {
  opacity: 0;
}

.menu-bottom {
  display: none;
}

@media all and (max-width: 1200px) {
  .links-list {
    gap: 1.25rem;
  }

  .header-link {
    gap: 1rem;
  }
}

@media all and (max-width: 1023px) {
  .header-button {
    display: none;
  }

  .menu-bottom {
    display: flex;
  }

  .links-list {
    transform: translateY(-1rem);
    opacity: 0;
    display: flex;
    position: fixed;
    top: var(--header);
    left: 0px;
    background-color: var(--bg);
    padding: 1.5rem;
    width: 100%;
    flex-direction: column;
    border-bottom: 2px solid var(--main);
    border-radius: 0px 0px 1.5rem 1.5rem;
    pointer-events: none;
    transition: all 0.3s ease-in-out;
    align-items: center;

    &.active {
      opacity: 1;
      transform: translateY(0);
      pointer-events: all;
    }
  }

  .header-lang-list {
    display: none;
  }

  .menu-icon {
    display: flex;
  }

  .header-logo {
    height: 32px;
  }

  .header-logo-wrapper {
    z-index: 1;
    background-color: var(--bg);
  }

  .header-wrapper {
    background-color: var(--bg);
  }
}
</style>
