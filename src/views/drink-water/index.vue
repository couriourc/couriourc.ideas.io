<route>
  { meta: { title: 'Drink Water' } }
</route>
<script lang="ts" setup>
  import ReturnButton from '../../components/returnButton.vue'
  const percentage = ref(0)
  const reminder = computed(() => {
    return 2000 - percentage.value
  })
</script>
<template>
  <ReturnButton />
  <div class="drink-water-container flex justify-center items-center h-full gap-12">
    <div class="cup flex flex-col h-500px border w-100px bg-white">
      <div class="reminder" :style="{ height: reminder + '%' }"></div>
      <div class="percentage" :style="{ height: percentage + '%' }"> </div>
    </div>
    <div>
      <h2 text-white>Total:{{ percentage }}ml</h2>

      <p text-white drop-shadow font-bold text-xl
        >Select how many glasses of water that you have drank</p
      >
      <div class="cup-count flex justify-between">
        <div
          v-for="item in 8"
          :key="item"
          text-center
          w-2em
          px-2
          py-4
          rounded-bl-2em
          rounded-br-2em
          border-2px
          bg-white
          duration-1000
          ease
          flex-wrap
          cursor="pointer"
          border="solid"
          :class="[
            'border-#144fc6',
            'small-cup',
            {
              active: item * 250 <= percentage
            }
          ]"
          @click="percentage = 250 * item"
        >
          <span text="#6ab3f8">{{ 100 / 4 }}0 ml</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  $cup-border: #144fc6;
  $fill-color: #6ab3f8;

  .cup {
    border: 2px solid $cup-border;
    box-shadow: 0 4px 4px 1px rgba($color: $cup-border, $alpha: 0.4);
    border-radius: 0 0 2em 2em;
    overflow: hidden;
    .reminder {
      transition: height 0.5s ease-in-out;
      height: 60%;
      &:hover {
        height: 60%;
      }
    }
    .percentage {
      transition: height 0.5s ease-in-out;
      height: 100%;
      background-color: #6ab3f8;
      position: relative;
      border-radius: -1.2em 12px 0 0;

      &::after {
        content: '';
        width: 150%;
        height: 12px;
        border-radius: 50%;
        display: block;
        position: absolute;
        background-color: white;
        top: -6px;
        animation: wave 4s ease-in-out infinite;
      }
    }
  }

  .small-cup.active {
    background-color: #6ab3f8;
    span {
      color: white;
    }
  }
  @keyframes wave {
    0% {
      transform: translateX(0);
      border-radius: 12px;
    }
    20% {
      transform: translateX(-10%);
      border-radius: 50%;
    }

    60% {
      border-radius: 12px;
    }
    80% {
      border-radius: 50%;
      transform: translateX(-10%);
    }

    100% {
      transform: translateX(0);
      border-radius: 12px;
    }
  }
</style>
