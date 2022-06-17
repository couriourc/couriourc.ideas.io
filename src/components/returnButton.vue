<script setup></script>

<template>
  <div class="flex justify-center items-center text-center w-screen">
    <button
      class="return-button bg-light-50 border-none outline-none p-2 rounded-bl-lg rounded-br-lg hover:bg-green hover:text-white hover:shadow-lg duration-700"
      @click="$router.replace('/')"
    >
      <span class="i-icon-carbon-github">return</span>
    </button>
    <div class="w-100% text-center text-white cursor-pointer">{{
      $attrs['page-title'] || $route.name
    }}</div>
  </div>
</template>
