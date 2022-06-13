<route>
  { meta: { title: 'Sound Board' } }
</route>
<script lang="ts" setup>
  import type { Ref } from 'vue'
  import { SoundBoardDriver } from '/@/drive'
  interface SongInterface {
    name: string
    url: string
  }
  const remoteList: Array<SongInterface> = [
    {
      name: 'SoundHelix Song',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
    },
    {
      name: 'SoundHelix Song 2',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
    },
    {
      name: 'SoundHelix Song 3',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
    }
  ]

  const songList: Ref<Array<SongInterface>> = ref([...remoteList])
  const audioTarget: Ref<HTMLAudioElement | null> = ref(null)
  const currentLoadingUrl: Ref<string | null> = ref(null)
  function handleWave(songUrl: string) {
    if (currentLoadingUrl.value) {
      return
    }
    currentLoadingUrl.value = songUrl
    if (audioTarget.value) {
      audioTarget.value.src = songUrl
      audioTarget.value.play().then(() => {
        currentLoadingUrl.value = null
      })
    }
  }

  onMounted(() => {
    SoundBoardDriver()
  })
</script>
<template>
  <div class="sound-board-container flex flex-no-wrap flex-col gap-10 items-center h-screen">
    <!-- 音频区域 -->
    <audio ref="audioTarget"> </audio>
    <!-- 卡片区域 -->
    <h1 class="text-light-50">Sound Board</h1>
    <div
      class="card bg-white w-12em p-5 rounded-sm cursor-pointer text-center"
      duration="500"
      id="card"
      hover="bg-#be4bdb text-light-50 shadow-lg animate-swing"
      v-for="item in songList"
      :key="item.name"
      @click="handleWave(item.url)"
    >
      <transition name="swing" enter-active-class="bounce" leave-active-class="swing">
        <span class="loading" v-show="currentLoadingUrl === item.url">😜</span>
      </transition>
      <span class="song-title whitespace-nowrap inline-block"> {{ item.name }}</span>
      <p class="progress bg-blue-500 w-full h-2px absolute left-0 radius-lg"></p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .card {
    position: relative;

    .loading {
      display: inline-block;
      animation: loading 1s ease-in-out infinite;
    }
    &:hover {
      .progress {
        background-color: transparent;
      }
    }
    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -150%);
      border-radius: 50%;
      background-color: white;
      width: 10px;
      height: 10px;
      z-index: 1;
      box-shadow: 0 0 4px 0px brown;
    }

    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -110%);
      border-radius: 50%;
      background-color: brown;
      width: 16px;
      height: 16px;
      box-shadow: 0 0 4px 0px brown;
    }
  }
  @keyframes loading {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
