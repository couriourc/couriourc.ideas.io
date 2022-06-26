<route>
  { meta: { title: 'Animated Navigation' } }
</route>
<script lang="ts" setup>
  import type { Ref } from 'vue'
  const isActive: Ref<boolean> = ref(false)
</script>
<template>
  <div class="animated-navigation-container h-screen w-screen flex justify-center items-center">
    <nav
      :class="[
        {
          active: isActive
        },
        'nav'
      ]"
      bg-white
      shadow-lg
      rounded-lg
      flex
      items-center
      justify-around
      p-5
    >
      <!-- 对应到导航栏 -->
      <ul class="list-none list p-0 m-0 flex gap-3">
        <li
          class="item hover:text-shadow-lg rounded p-2 cursor-pointer select-none transition-colors duration-1000 ease bg-white hover:text-white hover:bg-gray-400"
          v-waves
          @click="$router.go(-1)"
        >
          Return
        </li>
        <li
          class="item hover:text-shadow-lg rounded p-2 cursor-pointer select-none transition-colors duration-1000 ease bg-white hover:text-white hover:bg-gray-400"
          v-waves
          @click="$router.replace('/')"
        >
          Home
        </li>
      </ul>
      <!-- 控制区 -->
      <!-- 这里是用 两个横线来模拟的 icon  -->
      <!-- 通过计算转动的角度为大概 165deg 各自角度留下 15deg 中间夹角为 30deg -->
      <div
        class="bg-transparent h-30px w-30px relative cursor-pointer bg-light-50"
        @click="isActive = !isActive"
      >
        <div class="bg-#5290f9 line line-1 rounded-lg absolute top-10px"></div>
        <div class="bg-#5290f9 line line-2 rounded-lg absolute bottom-10px"></div>
      </div>
    </nav>
  </div>
</template>
<style lang="scss" scoped>
  .animated-navigation-container {
    background-image: linear-gradient(
      to bottom,
      #eafbff 0%,
      #eafbff 50%,
      #5290f9 50%,
      #5290f9 100%
    );
    .line {
      width: 2em;
      height: 2px;
      transform-origin: center;
      transition: transform 0.6s linear;
      left: 0;
    }
    .list {
      overflow: hidden;
      transition: width 0.6s linear;
      width: 0;

      .item {
        opacity: 0;
        transition: transform 0.6s linear, opacity 0.6s linear;
      }
    }
    .nav {
      width: 30px;
      transition: width 0.6s linear;
    }
    .nav.active {
      width: 360px;
      .list {
        // 超出就挡住
        width: 100%;

        .item {
          opacity: 1;
          transform: rotateY(360deg);
        }
      }
      left: 5px;

      .line-1 {
        transform: rotate(765deg) translateY(5.5px);
      }
      .line-2 {
        transform: rotate(-765deg) translateY(-5.5px);
      }
    }
  }
</style>
