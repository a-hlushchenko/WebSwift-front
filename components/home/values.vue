<template>
  <GeneralSection dark class="values-wrapper" id="values">
    <GeneralContainer>
      <GeneralFlex column section>
        <GeneralTitle light h2>{{ $t("home.values.title") }}</GeneralTitle>
        <div class="values">
          <GeneralBox big dark v-for="value in 4" class="value-item">
            <GeneralFlex center class="value-item-content">
              <div class="value-img-wrapper">
                <img
                  :src="$t(`home.values.img-${value}`)"
                  alt="image"
                  width="70px"
                  class="value-img"
                />
              </div>
              <GeneralFlex column mini class="value-item-right">
                <GeneralFlex
                  column
                  mini
                  style="width: fit-content"
                  class="value-item-right"
                >
                  <GeneralTitle light>
                    {{ $t(`home.values.value-${value}`) }}
                  </GeneralTitle>
                  <GeneralDivider />
                </GeneralFlex>
                <GeneralText light big class="value-item-text">{{
                  $t(`home.values.text-${value}`)
                }}</GeneralText>
              </GeneralFlex>
            </GeneralFlex>
          </GeneralBox>
        </div>
      </GeneralFlex>
    </GeneralContainer>
  </GeneralSection>
</template>

<style scoped>
.values {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.value-img-wrapper {
  width: 7.5rem;
  height: 7.5rem;
  border-radius: 100%;
  background-color: var(--dark-shade);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  transition: all 0.3s ease-in-out;
}

.value-item {
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: 0px 0px 10px var(--main);

    .value-img-wrapper {
      border-color: var(--main);
    }
  }
}

@media all and (max-width: 1023px) {
  .values {
    grid-template-columns: 1fr;
  }

  .value-img-wrapper {
    width: 7rem;
    height: 7rem;
  }

  .value-img {
    width: 4rem;
    height: 4rem;
  }
}

@media all and (max-width: 767px) {
  .value-img-wrapper {
    width: 5rem;
    height: 5rem;
  }

  .value-img {
    width: 3rem;
    height: 3rem;
  }

  .value-item {
    padding: 0.75rem;
  }

  .value-item-content {
    gap: 0.5rem;
  }

  .value-item-right {
    gap: 0.25rem;
  }

  .value-item-text {
    font-size: 0.87rem;
  }
}
</style>
