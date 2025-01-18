<script setup lang="ts">
const formStore = useFormStore();

function openForm() {
  formStore.setInitiator("Services");
  formStore.openForm();
}
</script>

<template>
  <GeneralSection id="services">
    <GeneralContainer>
      <GeneralFlex column section>
        <GeneralTitle h2>{{ $t("home.services.title") }}</GeneralTitle>
        <div class="services">
          <GeneralBox shadow big v-for="service in 6" class="service">
            <GeneralFlex column class="service-content">
              <img
                :src="$t(`home.services.img-${service}`)"
                width="100"
                alt="image"
              />
              <GeneralTitle fitHeight>{{
                $t(`home.services.service-${service}`)
              }}</GeneralTitle>
              <GeneralText big>{{
                $t(`home.services.text-${service}`)
              }}</GeneralText>
            </GeneralFlex>
          </GeneralBox>
        </div>
        <GeneralButton fit @click="openForm">
          {{ $t("home.services.button") }}
        </GeneralButton>
      </GeneralFlex>
    </GeneralContainer>
  </GeneralSection>
</template>

<style scoped>
.services {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.service:hover {
  box-shadow: 0px 0px 20px var(--main);
}

@media all and (max-width: 1023px) {
  .services {
    grid-template-columns: 1fr 1fr;
  }

  .service-content {
    gap: 0.75rem;
  }
}

@media all and (max-width: 767px) {
  .services {
    grid-template-columns: 1fr;
  }
}
</style>
