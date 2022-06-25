<route>
{ meta: { title: 'Random Choice Picker' } }
</route>
<script lang="ts" setup>
  import type { Ref } from 'vue'
  // 绑定用户输入的数据
  const choices: Ref<string> = ref('')
  // 创建映射，用于输入的选项
  const randomChoice = computed(() => {
    const value: string = choices.value.trim()
    if (!value.trim()) return []
    const choicesArray = value.trim().split(',')
    return choicesArray
  })
  // 存储当前所选
  let curSelect = ref('')
  function pickerRandom() {
    let len = randomChoice.value.length
    let index = Math.floor(Math.random() * len)
    return randomChoice.value[index]
  }

  let lock = false
  function startRandomChoice() {
    // 防止重复点击，加上🔒
    if (lock) return
    lock = true

    let timer = 90
    // 开始随机挑选
    let interval = setInterval(() => {
      let choice = pickerRandom()
      curSelect.value = choice
    }, 100)
    // 倒计时，确认最终结果
    setTimeout(() => {
      // 结果处理
      clearInterval(interval)
      lock = false
      // 弹出结果
      setTimeout(() => {
        let choice = pickerRandom()
        curSelect.value = choice
      }, 100)
    }, timer * 10)
  }
</script>
<template>
  <div flex justify="center" flex-col items-center h-screen>
    <h3 text-white>
      <p>Enter all of the choices divided by a comma (','). </p>
    </h3>

    <textarea
      placeholder="Enter choices here..."
      class="placeholder-dark-100 >sm:w-full"
      lg="w-500px"
      md="w-300px"
      w="80%"
      p-2
      outline-none
      border-none
      rounded-lg
      shadow-lg
      rows="12"
      v-model="choices"
      @keydown.enter="startRandomChoice"
    ></textarea>
    <ul list-none flex flex-wrap gap-1 lg="w-500px" md="w-300px" w="80%">
      <li
        v-for="(item, index) in randomChoice"
        :key="item + index"
        text-white
        bg-dark-300
        p-2
        rounded-2em
        cursor="pointer"
        hover="bg-dark-50"
        user-select="none"
        :class="{
          active: curSelect === item
        }"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
  .active {
    background-color: #00bcd4;
    box-shadow: 0 3px 2px 0px rgba(2, 2, 2, 0.1), inset 0 0 10px 4px rgba(18, 64, 124, 0.2),
      inset 0 0 3px 0px rgba(20, 231, 126, 0.2);
  }
</style>
