<script setup>
  import ReturnButton from '/@/components/returnButton.vue'
</script>

<template>
  <ReturnButton page-title="Expanding Card 1/50" />
  <div class="expanding-container p-5 flex gap-3 items-center justify-center">
    <div
      class="card w-30px transition-all duration-1000 hover:w-400px h-90vh content-center rounded-lg"
    >
    </div>
    <div
      class="card w-30px transition-all duration-1000 hover:w-400px h-90vh content-center rounded-lg"
    ></div>
    <div
      class="card w-30px transition-all duration-1000 hover:w-400px h-90vh content-center rounded-lg"
    ></div>
  </div>
</template>
<style lang="scss" scoped>
  .card {
    background-image: url('https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80');
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .title {
    color: aqua;
    mix-blend-mode: difference;
  }
</style>
