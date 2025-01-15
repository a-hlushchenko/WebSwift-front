<template>
  <GeneralSection dark class="values-wrapper" id="values">
    <GeneralContainer>
      <GeneralFlex column section>
        <GeneralTitle light h2>{{ $t("home.values.title") }}</GeneralTitle>
        <div class="values">
          <GeneralBox big dark v-for="value in 4" class="value-item">
            <GeneralFlex center>
              <div class="value-img-wrapper">
                <img
                  :src="$t(`home.values.img-${value}`)"
                  alt="image"
                  width="70px"
                />
              </div>
              <GeneralFlex column mini>
                <GeneralFlex column mini style="width: fit-content">
                  <GeneralTitle light>
                    {{ $t(`home.values.value-${value}`) }}
                  </GeneralTitle>
                  <GeneralDivider />
                </GeneralFlex>
                <GeneralText light big>{{
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
</style>
