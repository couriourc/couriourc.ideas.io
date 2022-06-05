<script setup>
  import { useShare } from '@vueuse/core'
  import { postLogin } from '/@/services/userService'

  const { share } = useShare()

  function startShare() {
    share({
      title: 'Hello',
      text: 'Hello my friend!',
      url: location.href
    })
  }

  onMounted(() => {
    handlePostLogin()
  })

  function handlePostLogin() {
    // Mock login
    postLogin({
      username: 'admin',
      password: 'admin'
    }).then((res) => {
      console.log(res)
    })
  }
</script>
<template>
  <details open>
    <summary>关于本项目中的一些工具</summary>
    <details open>
      <summary>
        <a
          target="_blank"
          p="y-1 x-2"
          m="x-4"
          font="semibold"
          shadow="sm"
          bg="gray-500 hover:green-700"
          border="rounded-lg none "
          cursor="pointer"
          color="white"
        >
          波纹效果
        </a>
      </summary>
      <p>
        <button v-waves>波纹效果</button>
      </p>
    </details>
    <details open>
      <summary>
        <a
          href="https://github.com/unocss/unocss"
          target="_blank"
          p="y-2 x-4"
          m="x-4"
          font="semibold"
          shadow="sm"
          bg="gray-500 hover:green-700"
          border="rounded-lg none "
          cursor="pointer"
          color="white"
        >
          使用 UnoCss
        </a>
      </summary>
      <p>
        <button
          v-waves
          p="y-2 x-4"
          font="semibold"
          shadow="lg"
          text="white"
          bg="green-500 hover:green-700"
          border="rounded-lg none "
          cursor="pointer"
        >
          <a> Uno CSS </a>
        </button>
      </p>
    </details>
    <details open>
      <summary>
        <a
          href="https://github.com/unocss/unocss"
          target="_blank"
          p="y-2 x-4"
          m="x-4"
          font="semibold"
          shadow="sm"
          bg="gray-500 hover:green-700"
          border="rounded-lg none "
          cursor="pointer"
          color="white"
        >
          使用 Vue Use
        </a>
      </summary>
      <p>
        <button @click="startShare">分享</button>
      </p>
    </details>
    <details open>
      <summary>
        <a
          href="https://kazupon.github.io/vue-i18n/zh/introduction.html"
          target="_blank"
          p="y-2 x-4"
          m="x-4"
          font="semibold"
          shadow="sm"
          bg="gray-500 hover:green-700"
          border="rounded-lg none "
          cursor="pointer"
          color="white"
        >
          采用插件 vue3-i18n
        </a>
      </summary>
      <p v-waves>
        <a>
          {{ $t('common.okText') }}
          {{ $t('home.layout.title') }}
        </a>
      </p>
    </details>
  </details>
</template>

<style>
  details {
    padding: 0 30px;
    margin-bottom: 2px;
  }
</style>
