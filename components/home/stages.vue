<template>
  <GeneralSection>
    <GeneralContainer>
      <GeneralFlex section column>
        <GeneralTitle h2>{{ $t("home.stages.title") }}</GeneralTitle>

        <div class="stages">
          <GeneralFlex class="stage" center v-for="stage in 4">
            <GeneralFlex column small class="stage-content">
              <GeneralTitle>{{
                $t(`home.stages.stage-${stage}`)
              }}</GeneralTitle>
              <GeneralText big class="stage-text">
                {{ $t(`home.stages.text-${stage}`) }}
              </GeneralText>
            </GeneralFlex>
            <div class="number">{{ stage }}</div>
          </GeneralFlex>
          <svg
            class="lines"
            width="294"
            height="318"
            viewBox="0 0 294 318"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 197.646L291.778 120"
              stroke="black"
              stroke-width="3"
              stroke-linecap="round"
            />
            <path
              d="M2 238L291.778 315.646"
              stroke="black"
              stroke-width="3"
              stroke-linecap="round"
            />
            <path
              d="M2 2L291.778 79.6457"
              stroke="black"
              stroke-width="3"
              stroke-linecap="round"
            />
          </svg>
        </div>
      </GeneralFlex>
    </GeneralContainer>
  </GeneralSection>
</template>

<style scoped>
.stages {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 294px 1fr;
  grid-template-rows: 1fr 1fr;
  justify-items: stretch;
  gap: 60px 2rem;
  padding-bottom: 60px;
  align-items: start;
}

.number {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7.5rem;
  height: 7.5rem;
  border: 3px solid var(--main);
  border-radius: 50%;
  font-size: 2rem;
  font-weight: 700;
  flex-shrink: 0;
  transition: all 0.3s ease-in-out;
}

.lines {
  margin-top: 60px;
  grid-row: 1 / 3;
  grid-column: 2 / 3;
}

.stage:nth-child(odd) {
  justify-content: end;

  .stage-content {
    align-items: end;
  }

  .stage-text {
    text-align: end;
  }
}

.stage:nth-child(even) {
  transform: translateY(95px);
  .number {
    order: -1;
  }
}

.stage:hover {
  .number {
    border-radius: 2rem;
    box-shadow: 0px 0px 10px var(--main);
  }
}
</style>
