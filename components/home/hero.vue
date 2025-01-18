<script setup lang="ts">
const { t } = useI18n();

const formStore = useFormStore();

function openForm() {
  formStore.setInitiator("Hero");
  formStore.openForm();
}

const element1 = ref<HTMLElement | null>(null);
const element2 = ref<HTMLElement | null>(null);

const rect1 = reactive({ x: 0, y: 100 });
const rect2 = reactive({ x: 50, y: 50 });
const rect3 = reactive({ x: 50, y: 50 });
const rect4 = reactive({ x: 100, y: 0 });

const initialPositions = reactive({
  rect1: { x: rect1.x, y: rect1.y },
  rect2: { x: rect2.x, y: rect2.y },
  rect3: { x: rect3.x, y: rect3.y },
  rect4: { x: rect4.x, y: rect4.y },
});

const handleMouseMove = (event: MouseEvent) => {
  if (window.innerWidth < 1400) return;

  if (!element1.value || !element2.value) return;

  const svgElement = event.currentTarget as SVGSVGElement;
  const rect = svgElement.getBoundingClientRect();
  const imgSize = rect.height;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  if (
    mouseX < 100 ||
    mouseY < 100 ||
    mouseX > imgSize - 100 ||
    mouseY > imgSize - 100
  ) {
    handleMouseLeave();
    return;
  }

  element1.value.classList.remove("rect1");
  element2.value.classList.remove("rect2");

  console.log("unset");

  const offsetX = mouseX - centerX;
  const offsetY = mouseY - centerY;

  const size = 400;

  rect1.x = centerX + offsetX - size / 2;
  rect1.y = centerY + offsetY - size / 2;

  rect2.x = centerX - offsetX - size / 2;
  rect2.y = centerY - offsetY - size / 2;

  rect3.x = centerX + offsetX - size / 2;
  rect3.y = centerY - offsetY - size / 2;

  rect4.x = centerX - offsetX - size / 2;
  rect4.y = centerY + offsetY - size / 2;
};

const handleMouseLeave = () => {
  rect1.x = initialPositions.rect1.x;
  rect1.y = initialPositions.rect1.y;

  rect2.x = initialPositions.rect2.x;
  rect2.y = initialPositions.rect2.y;

  rect3.x = initialPositions.rect3.x;
  rect3.y = initialPositions.rect3.y;

  rect4.x = initialPositions.rect4.x;
  rect4.y = initialPositions.rect4.y;

  if (!element1.value || !element2.value) return;

  element1.value.classList.add("rect1");
  element2.value.classList.add("rect2");
};
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
        <div
          @mousemove="handleMouseMove"
          @mouseleave="handleMouseLeave"
          class="hero-img-wrapper"
        >
          <svg
            class="hero-img"
            width="500"
            height="500"
            viewBox="0 0 500 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              :x="rect1.x"
              :y="rect1.y"
              width="400"
              height="400"
              rx="12"
              stroke="#FB7D09"
              stroke-width="3"
              class="rect1"
              ref="element1"
            />
            <rect
              :x="rect2.x"
              :y="rect2.y"
              width="400"
              height="400"
              rx="12"
              stroke="#FB7D09"
              stroke-width="3"
            />
            <rect
              :x="rect3.x"
              :y="rect3.y"
              width="400"
              height="400"
              rx="12"
              stroke="#FB7D09"
              stroke-width="3"
            />
            <rect
              :x="rect4.x"
              :y="rect4.y"
              width="400"
              height="400"
              rx="12"
              stroke="#FB7D09"
              stroke-width="3"
              class="rect2"
              ref="element2"
            />
          </svg>
        </div>
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
  gap: 3rem;
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

.hero-img-wrapper {
  width: fit-content;
  height: fit-content;
  justify-self: center;
  align-self: center;
  position: relative;
}

.hero-img {
  max-width: 100%;
  width: fit-content;
  height: fit-content;
  overflow: visible;

  rect {
    transition: all 1s ease-out;
  }
}

.rect1 {
  animation: square1 8s ease-in-out infinite;
}

.rect2 {
  animation: square2 8s ease-in-out infinite;
}

@keyframes square1 {
  from,
  to {
    transform: translate(0);
  }

  25% {
    transform: translate(0, -20%);
  }

  50% {
    transform: translate(20%, -20%);
  }

  75% {
    transform: translate(20%, 0);
  }
}

@keyframes square2 {
  from,
  to {
    transform: translate(0);
  }

  25% {
    transform: translate(0, 20%);
  }

  50% {
    transform: translate(-20%, 20%);
  }

  75% {
    transform: translate(-20%, 0);
  }
}

@media all and (max-width: 1023px) {
  .hero {
    grid-template-columns: 1fr;
    justify-items: center;
  }

  .hero-img-wrapper {
    order: -1;
  }

  .hero-img {
    max-height: 50vh;
  }

  .hero-mouse {
    display: none;
  }
}
</style>
