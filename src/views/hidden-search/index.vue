<script lang="ts" setup>
  import returnButtonVue from '/@/components/returnButton.vue'
  import type { Ref } from 'vue'
  const isActive: Ref<boolean> = ref(false)
</script>

<template>
  <returnButtonVue page-title="hidden-search" />
  <div class="hidden-search-container flex justify-center items-center h-500px">
    <div class="text-light-100 bg-white flex justify-center items-center p-3 rounded-lg shadow-lg">
      <input
        :class="[
          'search',
          'outline-none',
          'border-none',
          'placeholder:placeholder-light-900',
          'w-0',
          'duration-1000',
          'ease',
          {
            active: isActive
          }
        ]" />

      <i
        class="search-icon i-carbon-search text-blue-700 font-36px cursor-pointer"
        @click="isActive = !isActive"
      >
      </i
    ></div>
  </div>
</template>
<style lang="scss" scoped>
  .search.active {
    transform-origin: top left;
    width: 400px;
  }
</style>
