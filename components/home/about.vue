<template>
  <GeneralSection dark id="about" class="about-wrapper">
    <GeneralContainer>
      <GeneralFlex column section>
        <GeneralFlex column>
          <GeneralTitle light h2>{{ $t("home.about.title") }}</GeneralTitle>
          <GeneralDivider />
          <GeneralText class="about-text" big light>{{
            $t("home.about.text")
          }}</GeneralText>
        </GeneralFlex>
        <GeneralFlex space center class="about-list">
          <GeneralFlex column center v-for="number in 4" class="about-item">
            <div class="about-number">
              {{ $t(`home.about.number-${number}`) }}
            </div>
            <GeneralTitle light style="text-align: center">{{
              $t(`home.about.number-title-${number}`)
            }}</GeneralTitle>
          </GeneralFlex>
        </GeneralFlex>
        <NuxtLink to="/#values">
          <GeneralButton fit more>{{ $t("home.about.button") }}</GeneralButton>
        </NuxtLink>
      </GeneralFlex>
    </GeneralContainer>
  </GeneralSection>
</template>

<style scoped>
.about-wrapper {
  border-radius: 2rem 2rem 0 0;
}

.about-text {
  max-width: 800px;
}

.about-number {
  color: var(--main);
  font-size: 4rem;
  line-height: 4rem;
  transition: all 0.3s ease-in-out;
}

.about-item:hover {
  .about-number {
    transform: scale(1.1);
  }
}

@media all and (max-width: 767px) {
  .about-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: center;
    justify-content: center;
  }

  .about-number {
    font-size: 3rem;
    line-height: 3rem;
  }
}
</style>
