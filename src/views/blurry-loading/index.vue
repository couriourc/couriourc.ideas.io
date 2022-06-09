<route>
{ meta: { title: 'Blurry Loading' } }
</route>
<script lang="ts" setup></script>

<template>
  <div class="container blurry-loading w-full h-screen">
    <section class="content flex justify-center items-center">
      <button
        class="p-3 bg-light-50 outline-none border-none shadow-lg absolute z-10 top-50% -translate-y-50% hover:bg-green hover:text-light-100 rounded-md"
        @click="$router.replace('/')"
      >
        返回
      </button>
    </section>
    <div class="bg w-full h-full"></div>
  </div>
</template>
<style lang="scss" scoped>
  body {
    overflow: hidden;
  }
  .bg {
    // 这里是从 unplash 巴拉的一个图片来的
    background: url('https://images.unsplash.com/photo-1576161787924-01bb08dad4a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2104&q=80')
      no-repeat center center/cover;
    // 其实就是这里做了动画时间控制
    transition: filter 1s ease;

    filter: blur(100px);
  }
  .bg:hover {
    // 本来这里是需要通过动画来实现的，但是我这里打算只使用 css 来做，因此就不做事件限制，其实就是 filter 得值得变化而已
    filter: blur(0px);
  }
</style>
