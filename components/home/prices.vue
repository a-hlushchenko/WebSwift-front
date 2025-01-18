<script setup lang="ts">
const formStore = useFormStore();

function openForm() {
  formStore.setInitiator("Prices");
  formStore.openForm();
}
</script>

<template>
  <GeneralSection dark id="prices" class="about-wrapper">
    <GeneralContainer>
      <div class="prices">
        <GeneralFlex column section class="prices-main">
          <GeneralTitle light h2>{{ $t("home.prices.title") }}</GeneralTitle>

          <GeneralFlex column class="desc-list">
            <GeneralFlex center v-for="desc in 4" class="desc-item">
              <span class="circle"></span>
              <GeneralText big light>{{
                $t(`home.prices.desc-${desc}`)
              }}</GeneralText>
            </GeneralFlex>
          </GeneralFlex>

          <GeneralButton fit @click="openForm">{{
            $t("home.prices.button")
          }}</GeneralButton>
        </GeneralFlex>
        <GeneralBox big dark class="prices-box">
          <GeneralFlex column>
            <GeneralFlex column small v-for="price in 4" class="price-block">
              <GeneralTitle light>{{
                $t(`home.prices.name-${price}`)
              }}</GeneralTitle>
              <GeneralText big class="price">{{
                $t(`home.prices.price-${price}`)
              }}</GeneralText>
            </GeneralFlex>
          </GeneralFlex>
        </GeneralBox>
      </div>
    </GeneralContainer>
  </GeneralSection>
</template>

<style scoped>
.prices {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  align-items: center;
}

.price {
  color: var(--main);
}

.divider {
  width: 100%;
  background-color: var(--dark);
  height: 2px;
}

.price-block:not(:last-child) {
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--dark);
}

.circle {
  display: block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  flex-shrink: 0;
  border: 4px solid var(--main);
}

.prices-box {
  border: 1px solid transparent !important;
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: 0px 0px 10px var(--main);
    /* border-color: var(--main) !important; */
  }
}

@media all and (max-width: 1023px) {
  .desc-item {
    gap: 0.75rem;
  }

  .prices {
    grid-template-columns: 5.5fr 4.5fr;
  }
}

@media all and (max-width: 767px) {
  .desc-item {
    gap: 0.75rem;
  }

  .prices {
    grid-template-columns: 1fr;
  }

  .prices-box {
    order: -1;
  }

  .prices-main {
    gap: 1rem;
  }

  .desc-list {
    gap: 0.75rem;
  }
}
</style>
