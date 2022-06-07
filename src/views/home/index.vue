<script setup>
  import { useRouter } from 'vue-router'
  const isShow = ref(false)
  const router = useRouter()

  function triggerShow() {
    isShow.value = !isShow.value
  }
  function toTutorial() {
    router.push('/tutorial')
  }
</script>
<template>
  <header class="header flex justify-between px-1 py-2 text-light-50">
    <span class="active:text-blue-500 rounded-lg py-1 px-1 cursor-pointer select-none" v-waves>
      {{ $t('common.websiteName') }}
    </span>
    <span class="active:text-blue-500 rounded-lg py-1 px-1 cursor-pointer select-none" v-waves>
      Go!</span
    >
  </header>

  <content
    class="logo-panel mx-auto my-0 rounded-md shadow-light-500 w-90% h-40vh bg-light-100 block p-2 outline-none font-serif max-h-40vh"
  >
    <main>
      <ul class="grid grid-rows-3 grid-cols-3">
        <li
          class="col-span-1 row-span-1 bg-dark-100 text-light-50 mr-1 inline-block text-center text hover:text-dark-100 hover:bg-white-100 border shadow-lg wrap-content p-2 overflow-hidden rounded-lg cursor-pointer duration-700"
          title="expanding-cards"
        >
          <span @click="router.push('/expanding-cards')"> expanding-cards</span>
        </li>
        <li
          class="col-span-1 row-span-1 bg-dark-100 text-light-50 mr-1 inline-block text-center text hover:text-dark-100 hover:bg-white-100 border shadow-lg wrap-content p-2 overflow-hidden rounded-lg cursor-pointer duration-700"
          title="progress-step"
        >
          <span @click="router.push('/progress-step')"> progress-step</span>
        </li>
      </ul>
    </main>
  </content>
  <div class="w-full flex justify-center mt-20">
    <button
      class="w-40px h-40px p-2 rounded-full outline-transparent shadow-light-50 text-center border-none hover:bg-green-300 hover:shadow-dark-50 hover:shadow-lg hover:text-light-100 text-dark-50 transition-all duration-500 hover:animate-bounce"
      @click="toTutorial"
      v-waves
    >
      <span class="before:content-🧛"> Go </span>
    </button>
  </div>
  <footer
    class="footer flex justify-center px-1 py-2 text-light-50 fixed bottom-0 left-50% translate-x-{-50%} font-thin font-{19px} scale-50"
  >
    <p>@Copyright Couriourc anytime do</p>
  </footer>
  <teleport to="body">
    <transition
      name="fade"
      leave-active-class="animate-fade-out"
      enter-active-class="animate-fade-in"
    >
      <div
        class="fixed bg-dark-200 w-400px h-400px top-50% left-50% translate--50% opacity-90 text-light-50 p-4 transition-opacity duration-500 rounded-md"
        v-if="isShow"
      >
        <div class="flex justify-between">
          <div class="font-bold">title</div>
          <button @click="triggerShow">X</button>
        </div>
        <div class="bg-light-50 mt-2 rounded h-90% text-dark-300 p-1 indent-xs">
          <div class="row">
            <p class="bg-light-800 p-1 rounded-lg">Ctrl + D</p>
            <span>-------------显示页面</span>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>
