<route>
{ meta: { title: 'Key Event' } }
</route>

<script lang="ts" setup>
  import { Ref } from 'vue'
  function useKeyDown() {
    const codeDetail: Ref<{
      code: string | null
      key: string | null
      keyCode: number | null
    }> = ref({
      key: null,
      keyCode: null,
      code: null
    })
    onMounted(() => {
      document.addEventListener('keypress', (e: KeyboardEvent) => {
        const { key, keyCode, code } = e
        if (codeDetail.value.code === code) return
        codeDetail.value.code = code
        codeDetail.value.key = key
        codeDetail.value.keyCode = keyCode
      })
    })

    onBeforeUnmount(() => {
      document.removeEventListener('keypress', () => {})
    })

    return codeDetail
  }
  const event = useKeyDown()
</script>
<template>
  <div class="key-event--conterin flex flex-col justify-center items-center w-screen h-screen">
    <transition
      name="fade"
      enter-active-class="animate-fade-in"
      leave-active-class="animate-fade-out"
      :duration="100"
    >
      <div
        v-if="!event.key"
        class="bg-white px-12 py-10 text-center shadow-lg border-1px border-gray-200 contrast-90 rounded-lg"
      >
        press any key to get the keyCode
      </div>
      <div key="start" flex flex-col justify-center items-center v-else>
        <h1
          text-white
          text-center
          drop-shadow="lg"
          cursor="pointer"
          class="text-3xl font"
          hover="text-light-800 scale-99 m-auto p-0"
          @click="$router.replace('/')"
          >Event Key Code
        </h1>
        <ul flex gap-3>
          <li flex flex-col items-center text-center v-for="(detail, index) in event" :key="index">
            <small block w-full p-3 text-white-100> {{ index }}</small>
            <div cursor-pointer bg-white p-8 px-10 text-center outline="gray-300">
              {{ detail }}
            </div>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>
<style lang="scss" scoped></style>
