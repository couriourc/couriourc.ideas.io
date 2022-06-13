<route>
{ meta: { title: 'Dad Jokes(hitoko)' } }
</route>
<template>
  <ReturnButton />
  <div class="dad-jokes-hitoko-container h-screen flex justify-center items-center">
    <div class="card block w-90% lg:w-400px md:w-70% bg-light-50 p-4 rounded-lg flex flex-col">
      <h2 class="text-gray text-center font-sans drop-shadow cursor-pointer select-none">
        每日一言
      </h2>

      <div class="min-h-100px text-dark-200 cursor-pointer">
        <p text-center selection:text-red-300>{{ sentence.hitokoto }}</p>
        <p text-right> {{ `---${sentence.from_who}《${sentence.from}》` }} </p>
      </div>
      <button
        class="get-btn outline-none w-60% m-auto rounded border-none p-3 mt-10 bg-#9f68e0 text-light-50"
        @click="handleGetSentence"
        v-waves
        >Get Sentence</button
      >
    </div>
  </div>
</template>
<script lang="ts" setup>
  import type { Ref } from 'vue'
  import { getSentenceService, hikitoSentenceType } from '/@/services/dad-jokes/sentenceService'
  import type { HikitoSentence } from '/@/services/dad-jokes/sentenceService'
  import ReturnButton from '/@/components/returnButton.vue'

  const sentence: Ref<HikitoSentence> = ref({
    id: 7297,
    uuid: 'ed9119a0-0051-421a-8863-710e82edba79',
    hitokoto: '就算天塌下来变成一片废墟，他的脸色也不会有丝毫变化。',
    type: hikitoSentenceType.b,
    from: '人生的智慧',
    from_who: '叔本华',
    creator: '折影轻梦',
    creator_uid: 9975,
    reviewer: 9975,
    commit_from: 'web',
    created_at: '1628421050'
  })

  interface LoadingMemoInterface {
    loading: boolean
  }
  const debounce = (() => {
    let memo: LoadingMemoInterface = {
      loading: false
    }
    return function debounce(fn: Function) {
      if (memo.loading) {
        return
      }
      memo.loading = true
      fn(memo)
    }
  })()
  function handleGetSentence() {
    return debounce((memo: LoadingMemoInterface) => {
      getSentenceService()
        .then((res: HikitoSentence) => {
          sentence.value = res
        })
        .finally(() => {
          memo.loading = false
        })
    })
  }

  onMounted(() => {
    handleGetSentence()
  })
</script>
<style lang="scss" scoped>
  .get-btn {
    box-shadow: 0 5px 15px rgb(0 0 0 / 10%), 0 6px 6px rgb(0 0 0 / 10%);
  }
</style>
