<route>
{ meta: { title: 'Rotating Navigation' } }
</route>
<script lang="ts" setup>
  import type { Ref } from 'vue'
  // 导航列表

  interface NavListProps {
    title: string
    path: string
  }

  const navList: Ref<Array<NavListProps>> = ref([
    {
      path: '/',
      title: 'home'
    },
    {
      path: '/tutorial',
      title: 'tutorial'
    }
  ])
  const isActive: Ref<boolean> = ref(false)
  function triggerActive() {
    isActive.value = !isActive.value
  }
</script>
<template>
  <div
    :class="[
      'rotating-navigation-container',
      'w-full',
      'h-screen',
      'bg-gray-400',
      'z-100',
      'absolute',
      'duration-1000',
      'origin-top-left',
      'rounded-lg',
      {
        active: isActive
      }
    ]"
  >
    <div
      class="circle fixed w-100px h-100px bg-orange-500 rounded-full absolute -top-20px -left-20px shadow-lg cursor-pointer text-center"
      @click="triggerActive"
    >
      <i class="i-logos-vue absolute top-11" v-waves></i
    ></div>

    <div class="content text-light-50 p-2 shadow-lg text-center">
      <h1>About 咸鱼润 </h1>
      <h3> 一条有梦想的咸鱼 </h3>
      <h4> 会划水会摸鱼的咸鱼 </h4>
    </div>
  </div>

  <nav class="bottom-nav fixed bottom-12 -left-10 p-0">
    <ul class="example-nav-list">
      <li
        class="item uppercase text-white cursor-pointer list-none hover:animate-bounce select-none hover:perspect-lg hover:translate-z-10 p-2 text-center"
        v-for="item in navList"
        :key="item.title"
        @click="$router.push(item.path)"
      >
        {{ item.title }}
      </li>
    </ul>
  </nav>
</template>
<style lang="scss" scoped>
  // body::deep {
  //   overflow: hidden;
  // }
  .active {
    transform: rotate(-10deg);
  }
</style>
