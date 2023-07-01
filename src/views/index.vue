<route>
{meta: { title: ' 首页 ' , navHidden: true} }
</route>
<script lang="ts" setup>
  import type { Ref } from 'vue'
  import routes from '~pages'

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
</script>
<template>
  <header bg-white class="header flex justify-end px-40px gap-5 py-2 drop-shadow">
    <span v-waves class="active:text-blue-500 rounded-lg cursor-pointer select-none" text-lg>
      <a
        class="decoration-none"
        hover="text-blue-700"
        href="https://github.com/couriourc/50-Project-in-Vue3"
        text-black-100
        underline="none"
      >
        couriourc
        <i aria-hidden="true" class="fa fa-github"></i>
      </a>
    </span>
  </header>
  <main
    class="logo-panel scroller w-90% h-40vh bg-#eeeeeee block font-serif max-h-40vh overflow-y-scroll"
    m="x-auto"
    my-10
    rounded-md
    shadow-light-500
  >
    <ul class="flex flex-wrap px-2">
      <li
        v-for="nav in navList"
        :key="nav.title"
        v-waves
        :title="nav.title"
        class="nav-item m-1 text-dark-50 inline-block text-center text hover:bg-blue-100 shadow-lg wrap-content p-2 overflow-hidden rounded-lg cursor-pointer duration-700 select-none"
        @click="$router.push(nav.path)"
      >
        <span> {{ nav.title }}</span>
      </li>
    </ul>
  </main>
  <div class="w-full flex justify-center mt-20">
    <button
      v-waves
      class="w-40px h-40px p-2 rounded-full outline-transparent shadow-red-50 text-center border-none text-dark-50 transition-all duration-500 cursor-pointer"
      @click="$router.push('/tutorial')"
    >
      <span class="before:content-🧛"> Go </span>
    </button>
  </div>
  <footer
    class="footer text-center px-1 py-2 text-light-50 fixed bottom-0 left-50% -translate-x-50% font-thin font-19px scale-50"
  >
    <p cursor="pointer" text-lg>@Copyright Couriourc anytime do</p>
  </footer>
</template>
<style lang="scss" scoped>
  .logo-panel {
    background: #ffffff;
    font-family: 'JetBrains Mono ExtraBold', sans-serif;
  }

  .nav-item {
    background: #eeeeee;
    box-shadow: 1px 1px 3px 1px #b2bec3;
  }

  .scroller::-webkit-scrollbar {
    width: 6px;
    height: min-content;
    border: dotted white;
    border-radius: 12px;
    background-color: #a5d8ff;
  }
</style>
<style>
  :root {
    font-family: 'JetBrains Mono ExtraBold', sans-serif;
  }
</style>
