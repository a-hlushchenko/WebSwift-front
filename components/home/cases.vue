<template>
  <GeneralSection id="cases">
    <GeneralContainer>
      <GeneralFlex column section>
        <GeneralTitle h2>{{ $t("home.cases.title") }}</GeneralTitle>
        <GeneralFlex>
          <GeneralBox shadow v-for="cases in 3" style="padding: 0px">
            <div>
              <img
                class="case-img"
                :src="$t(`home.cases.img-${cases}`)"
                alt="image"
              />
              <GeneralFlex column class="case-content">
                <GeneralFlex space center>
                  <GeneralTitle>{{
                    $t(`home.cases.name-${cases}`)
                  }}</GeneralTitle>
                  <NuxtLink
                    :to="$t(`home.cases.link-${cases}`)"
                    target="_blank"
                  >
                    <GeneralButton fit more>
                      {{ $t("home.cases.button") }}
                    </GeneralButton>
                  </NuxtLink>
                </GeneralFlex>
                <GeneralText big>{{
                  $t(`home.cases.text-${cases}`)
                }}</GeneralText>
                <GeneralDivider dashed />
                <GeneralText big>{{
                  $t(`home.cases.stack-${cases}`)
                }}</GeneralText>
              </GeneralFlex>
            </div>
          </GeneralBox>
        </GeneralFlex>
      </GeneralFlex>
    </GeneralContainer>
  </GeneralSection>
</template>

<style scoped>
.case-img {
  border-radius: 1rem;
  width: 100%;
}

.case-content {
  padding: 1rem;
}
</style>
