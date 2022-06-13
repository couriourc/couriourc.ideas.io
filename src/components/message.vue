<script lang="ts" setup>
  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    }
  })

  const show = ref(props.show)
  let timer

  function closeModel() {
    show.value = false
    clearTimeout(timer)
    timer = null
  }
  function showModel() {
    if (timer) return
    show.value = true
    timer = setTimeout(() => {
      show.value = false
      timer = null
    }, 2000)
  }

  defineExpose({
    showModel,
    closeModel
  })
</script>

<template>
  <teleport to="body">
    <transition
      name="show"
      enter-active-class="animate-fade-in"
      leave-active-class="animate-fade-out"
      :duration="100"
    >
      <div
        v-show="show"
        class="flex justify-center items-center px-6 py-2 duration-1000 fixed top-1em left-50% -translate-x-50% my-auto bg-green-300 rounded-lg shadow-lg cursor-pointer"
      >
        <slot></slot>
        <div class="i-icon-close ml-10" @click="closeModel">❎</div>
      </div>
    </transition>
  </teleport>
</template>
<style lang="scss" scoped></style>
