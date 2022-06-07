<script lang="ts" setup>
  import type { Ref } from 'vue'
  import ReturnButton from '/@/components/returnButton.vue'
  interface StepProps {
    title: string
  }
  const stepList: Ref<Array<StepProps> | null> = ref(
    new Array(5).fill(0).map((_, index) => {
      return {
        title: `Step${index + 1}`
      }
    })
  )

  const curIndex: Ref<number> = ref(0)

  function prevStep() {
    if (curIndex.value <= 0) return
    curIndex.value--
  }
  function nextStep() {
    if (stepList.value && stepList.value.length <= curIndex.value) {
      return
    }
    curIndex.value++
  }
</script>
<template>
  <return-button page-title="Progress Step 2/50" />
  <div :class="['flex', 'items-center', 'justify-center', 'container', 'flex-col']">
    <ul :class="['step-list', 'flex']">
      <li
        class="step-item relative list-none flex justify-center items-center"
        v-for="(step, index) in stepList"
        :key="step.title"
      >
        <div
          :class="[
            'content',
            'w-10',
            'h-10',
            'inline-block',
            'border',
            'rounded-full',
            'flex',
            'justify-center',
            'items-center',
            'text-light-50',
            'border-2',
            'duration-700',
            'ease',
            {
              active: index < curIndex
            }
          ]"
          >{{ step.title }}</div
        >
        <div class="step-tail mx-12px rounded-10 h-3px bg-dark-50 w-12 duration-700 ease"></div>
      </li>
    </ul>
    <div class="flex gap-2">
      <button
        class="outline-none border-none rounded-lg p-2 active:bg-light-700"
        @click="prevStep"
        v-waves
        >Prev Step</button
      >
      <button
        class="outline-none border-none rounded-lg p-2 active:bg-blue-700 bg-blue-500 text-white duration-500"
        @click="nextStep"
        v-waves
        >Next Step</button
      >
    </div>
  </div>
</template>

<style class="scss" scoped>
  .step-list > .step-item:last-child .step-tail {
    display: none;
  }
  .active {
    border-color: aqua;
    box-shadow: 0 0 0 0.4 rgba(0, 0, 0, 0.3);
  }
  .active + .step-tail {
    background-color: aqua;
  }
</style>
