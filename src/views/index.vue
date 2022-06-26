<route>
{ meta: { title: '首页' , navHidden: true} }
</route>
<script lang="ts" setup>
  import type { Ref } from 'vue'
  import routes from '~pages'
  import { setupL2dWidget } from '/@/util/L2dWidgets'

  interface NavItemProp {
    title: string
    path: string
  }
  console.log(routes)
  const navList: Ref<Array<NavItemProp>> = ref(
    routes
      .filter((route) => {
        return !route.meta?.navHidden
      })
      .map((route) => {
        return {
          path: route.path,
          title: route.meta?.title as string
        }
      })
  )
  onMounted(() => {
    nextTick(() => {
      setupL2dWidget()
    })
  })
</script>
<template>
  <header class="header flex justify-between px-1 py-2 text-light-50">
    <span class="active:text-blue-500 rounded-lg py-1 px-1 cursor-pointer select-none" v-waves>
      <a
        class="decoration-none"
        href="https://github.com/couriourc/50-Project-in-Vue3"
        underline="none"
        text-white
        hover="text-blue-700"
      >
        couriourc
        <sup class="i-logos-github" text-white></sup
      ></a>
    </span>
    <span class="active:text-blue-500 rounded-lg py-1 px-1 cursor-pointer select-none" v-waves>
      Go!</span
    >
  </header>

  <main
    class="logo-panel scroller w-90% h-40vh bg-light-100 block font-serif max-h-40vh overflow-y-scroll"
    m="x-auto"
    shadow-light-500
    rounded-md
  >
    <ul class="flex flex-wrap px-2">
      <li
        class="nav-item m-1 text-dark-50 inline-block text-center text hover:bg-blue-100 shadow-lg hover:animate-tada wrap-content p-2 overflow-hidden rounded-lg cursor-pointer duration-700 select-none"
        v-for="nav in navList"
        :key="nav.title"
        :title="nav.title"
        @click="$router.push(nav.path)"
        v-waves
      >
        <span> {{ nav.title }}</span>
      </li>
    </ul>
  </main>
  <div class="w-full flex justify-center mt-20">
    <button
      class="w-40px h-40px p-2 rounded-full outline-transparent shadow-red-50 text-center border-none text-dark-50 transition-all duration-500"
      hover="text-white-500 shadow-lg bg-green-300 animate-bounce"
      @click="$router.push('/tutorial')"
      v-waves
    >
      <span class="before:content-🧛"> Go </span>
    </button>
  </div>
  <footer
    class="footer text-center px-1 py-2 text-light-50 fixed bottom-0 left-50% -translate-x-50% font-thin font-19px scale-50"
  >
    <p cursor="pointer">@Copyright Couriourc anytime do</p>
  </footer>
</template>
<style lang="scss" scoped>
  .nav-item {
    box-shadow: 0 3px 2px 0px rgba(2, 2, 2, 0.1), inset 0 0 10px 4px rgba(18, 64, 124, 0.2),
      inset 0 0 3px 0px rgba(20, 231, 126, 0.2);
  }
  .light-line {
    --trans-x: 100%;
    overflow: hidden;
    &:hover {
      --trans-x: -100%;
    }
    &::before {
      content: '';
      display: inline-block;
      width: 100%;
      height: 4px;
      border-radius: 2em;
      position: absolute;
      background-color: aqua;
      transform: translateX(var(--trans-x));
      transition: transform 2s;
      opacity: 50%;
      z-index: 100;
    }
  }
  .scroller::-webkit-scrollbar {
    width: 6px;
    height: min-content;
    border: dotted white;
    border-radius: 12px;
    background-color: #a5d8ff;
  }
</style>
