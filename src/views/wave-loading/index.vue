<route>
  { meta: { title: 'Wave Loading' } }
</route>
<script lang="ts" setup>
  import ReturnButton from '/@/components/returnButton.vue'
</script>
<template>
  <ReturnButton />
  <div class="loading">
    <div class="magic-box agic-box-1">
      <div class="box left">
        <div style="--bg-color: #ff4757"></div>
        <div style="--bg-color: #ff4757"></div>
        <div style="--bg-color: #ff4757"></div>
      </div>
      <div class="box center">
        <div style="--bg-color: #2ed573"></div>
        <div style="--bg-color: #2ed573"></div>
        <div style="--bg-color: #2ed573"></div>
      </div>

      <div class="box right">
        <div style="--bg-color: #1e90ff"></div>
        <div style="--bg-color: #1e90ff"></div>
        <div style="--bg-color: #1e90ff"></div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .loading {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .magic-box {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 10px;
      .box {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        filter: drop-shadow(10px);
        div {
          width: 10px;
          height: 10px;
          background-color: #fff;
          border-radius: 50%;
          margin: 0 5px;
          animation: color-change 1s ease-in-out infinite, bounce 1s linear infinite;
          &:nth-child(1) {
            animation-delay: 0s;
          }
          &:nth-child(2) {
            animation-delay: 0.2s;
          }
          &:nth-child(3) {
            animation-delay: 0.4s;
          }
        }
      }
    }
  }
  @keyframes color-change {
    from {
      background-color: #fff;
    }
    to {
      background-color: var(--bg-color);
    }
  }
  @keyframes bounce {
    0% {
      transform: translateY(0%);
    }
    20% {
      transform: translateY(50%);
    }
    50% {
      transform: translateY(0);
    }
    80% {
      transform: translateY(-50%);
    }
    100% {
      transform: translateY(0);
    }
  }
</style>
