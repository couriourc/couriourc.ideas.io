<route>
{meta: { title: 'RegMatcher'} }
</route>
<script lang="ts">
  import 'highlight.js/lib/common'
  import 'highlight.js/styles/stackoverflow-light.css'
  import hljs from 'highlight.js/lib/core'
  import javascript from 'highlight.js/lib/languages/javascript'
  import HighlightJs from '@highlightjs/vue-plugin'

  hljs.registerLanguage('javascript', javascript)

  export default defineComponent({
    components: {
      HighlightJs: HighlightJs.component
    },
    setup() {
      console.log(HighlightJs)
      const origin = ref<string>('')
      const reg = ref<string>('')
      const target = ref<string>('')
      const targetPattern = ref<string>('')
      let regNow = new RegExp(reg.value)

      function replacer() {
        if (regNow.test(origin.value)) {
          target.value = origin.value.replace(
            regNow,
            targetPattern.value ? targetPattern.value : origin.value
          )
        } else {
          target.value = ''
        }
      }

      watch([reg], (newReg: any) => {
        try {
          regNow = new RegExp(newReg)
          replacer()
        } catch (err) {
          console.log(`err-->`, err)
        }
      })

      watch(
        [origin, targetPattern],
        () => {
          // 如果只是改了原始信息，那就只是使用正则
          replacer()
        },
        {
          immediate: true
        }
      )
      return {
        reg,
        targetPattern,
        target,
        origin
      }
    }
  })
</script>

<template>
  <header class="bg-#34495e text-#EEEEEE p-3 text-center text-xl cursor-pointer">
    正则文本替换
  </header>
  <div class="h-full w-full bg-#222f3e p-3 gap-2 flex flex-col">
    <div class="input-panel flex gap-2 py-4">
      <input
        v-model="reg"
        class="outline-none w-50% h-30px text-xl rounded border-none"
        placeholder=" 正则串 "
      />
      <button class="cursor-pointer">⏲</button>
      <input
        v-model="targetPattern"
        class="outline-none w-50% h-30px text-xl rounded border-none"
        placeholder=" 生成模式 "
      />
    </div>
    <form class="w-full flex flex-col gap-3">
      <label class="text-label text-#EEEEEE text-sm" for="origin"> 替换前文本 </label>
      <textarea
        v-model="origin"
        :cols="10"
        class="border-none block w-full h-max-300px h-full outline-none bg-#353b48 text-#EEEEEE rounded p-2 text-16px placeholder:text-#636e72"
        name="origin"
        placeholder="请输入文本"
      ></textarea>
      <div class="h-25px"></div>
      <label class="text-label text-#EEEEEE text-sm" for="target"> 替换后文本 </label>
      <textarea
        v-model="target"
        class="border-none block w-full outline-none bg-#353b48 text-#EEEEEE rounded p-2 text-16px placeholder:text-#636e72"
        name="target"
        placeholder=" 未匹配到文本 "
      >
      </textarea>
    </form>
  </div>
</template>
<style lang="scss" scoped>
  .text-label {
    position: relative;
    text-indent: 1em;

    &::after {
      content: '';
      display: block;
      width: 0.5em;
      height: 100%;
      background: #2ed573;
      top: 0;
      left: 0;
      position: absolute;
      border-radius: 12px;
      box-shadow: 2px 2px 3px 0 #29ba66;
    }
  }
</style>
