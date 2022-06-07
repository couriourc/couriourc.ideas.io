<script setup>
  import ReturnButton from '/@/components/returnButton.vue'
</script>

<template>
  <ReturnButton page-title="How to use it" />
  <div class="tutorial-container p-5">
    <section class="info-bar bg-light-50 w-100% min-h-400px block shadow-lg rounded-lg px-1 py-2">
      <p class="rtl content-item"> 创建路由, 并且在路由中添加一个组件</p>
      <p class="rtl content-item"> 开始你的页面</p>
      <p class="rtl content-item">
        提供工具有: Unocss、ReturnButton、i18n、autoImport , 提供指令有 v-waves 需要设置请自建</p
      >
    </section>
  </div>
</template>
<style lang="scss" scoped>
  .info-bar {
    counter-set: step;
  }
  .content-item {
    &:before {
      content: 'Step' counter(step);
      counter-increment: step;
      background-color: rgb(28, 151, 151);
      border-radius: 12px;
      padding: 2px;
      color: white;
      &::after {
        content: '\\0020';
      }
    }
  }
</style>
