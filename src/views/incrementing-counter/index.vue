<route>
  { meta: { title: 'Incrementing Counter' } }
</route>
<script lang="ts" setup>
  function useIncrementCounter(target, intervel, isAutoIncrement) {
    const value = ref<number>(0)
    const endCount = ~~(target / intervel)
    let count = 0

    function updateValue() {
      if (count <= endCount) {
        value.value += intervel
        count++
        return setTimeout(updateValue, 1)
      } else {
        value.value = target
      }
    }
    if (isAutoIncrement) {
      onMounted(() => {
        updateValue()
      })
      return value
    }
    return [value, updateValue]
  }

  const info = ref(
    [
      {
        id: '0',
        icon: 'fa-twitter',
        description: 'Twitter Followers',
        target: 12000
      },
      {
        id: '1',
        icon: 'fa-youtube',
        description: 'Youtube Followers',
        target: 12000
      },
      {
        id: '2',
        icon: 'fa-facebook',
        description: 'Facebook Followers',
        target: 12000
      }
    ].map((item) => {
      return {
        ...item,
        previewVal: useIncrementCounter(item.target, 100, true)
      }
    })
  )
</script>
<template>
  <div class="-translate-50% gap-20" absolute top="50%" left="50%" flex>
    <div
      class="font-sans flex flex-col justify-around items-center"
      v-for="item in info"
      :key="item.id"
      text-white
      font-bold
      @click="$router.replace('/')"
    >
      <i
        :class="['drop-shadow', 'text-white', 'icon', 'fa', 'animate-alternate', item.icon]"
        perserve-3d
      ></i>
      <h1 cursor="pointer" v-waves rounded px-2 hover="bg-#fed330" duration-1000>
        {{ item.previewVal }}</h1
      >
      <p font-400> {{ item.description }}</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .icon {
    font-size: 48px;
    position: relative;
    transition: transform 0.5s;
    &:hover {
      transform: scale(2);
    }
  }
</style>
