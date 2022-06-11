<route>
{ meta: { title: 'Scroll Time' } }
</route>

<script setup>
  import { onMounted } from 'vue'
  // 获取当前的滚动条的位置

  onMounted(() => {
    checkBoxes()
    window.addEventListener('scroll', checkBoxes)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', checkBoxes)
  })
  const cards = ref(null)

  function checkBoxes() {
    const triggerBottom = (window.innerHeight / 5) * 4
    cards.value.forEach((box) => {
      const boxTop = box.getBoundingClientRect().top
      if (boxTop < triggerBottom) {
        box.classList.add('show')
      } else {
        box.classList.remove('show')
      }
    })
  }

  const frontPageData = ref(10)
  const currentPageData = ref(10)
  const tailPageData = ref(10)
  // TODO 虚拟列表的实现
</script>

<template>
  <div class="scroll-time-container p-3">
    <div
      class="card translate-x-400% duration-1000 shadow-lg w-80vw m-auto h-100px flex justify-center items-center font-20px font-bold bg-white rounded-lg mb-10"
      v-for="item in frontPageData"
      :key="item"
      ref="cards"
      >Front</div
    >
    <div
      class="card translate-x-400% duration-1000 shadow-lg w-80vw m-auto h-100px flex justify-center items-center font-20px font-bold bg-white rounded-lg mb-10"
      v-for="item in currentPageData"
      :key="item"
      ref="cards"
    >
      Center
    </div>

    <div
      class="card translate-x-400% duration-1000 shadow-lg w-80vw m-auto h-100px flex justify-center items-center font-20px font-bold bg-white rounded-lg mb-10"
      v-for="item in tailPageData"
      :key="item"
      ref="cards"
    >
      Tail
    </div>
  </div>
</template>
<style lang="scss">
  .card:nth-of-type(even) {
    transform: translateX(-400%);
  }

  .card.show {
    transform: translateX(0);
  }

  body {
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: 4px;
      background-color: #eeeeee;
      box-shadow: 0 0 0 0.5rem rgba(0, 0, 0, 0.1);
    }
  }
</style>
