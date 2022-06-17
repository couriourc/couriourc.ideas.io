<route>
  { meta: { title: 'Faq Collapse' } }
</route>

<script lang="ts" setup>
  import ReturnButton from '/@/components/returnButton.vue'
  import type { Ref } from 'vue'

  interface Faq {
    title: string
    content: string
    isActive?: boolean
  }

  const faqList: Ref<Array<Faq>> = ref([
    {
      title: 'What is Vue?',
      content: 'Hello',
      isActive: false
    },
    {
      title: 'What is React?',
      content: 'Hello',
      isActive: false
    }
  ])
</script>

<template>
  <ReturnButton />
  <div class="faq-collapse-container">
    <h1
      class="faq-collapse-header p-0 m-0 font-sm font-sans font-18px text-center text-white drop-shadow"
    >
      Frequently Asked Questions
    </h1>

    <ul container p-1em>
      <li
        v-for="faq in faqList"
        :key="faq.title"
        :class="[
          'card',
          {
            active: faq.isActive
          }
        ]"
        bg-gray-200
        list-none
        px-12px
        py-4px
        border="#9fa4a8"
        rounded-lg
        @click="faq.isActive = !faq.isActive"
        mb-8
      >
        <h3 class="title z-10" font="12px" drop-shadow flex justify="between">
          <span> {{ faq.title }}</span
          ><i
            :class="['fa', 'fa-chevron-down', 'hover:text-orange-900', 'duration-700', 'down-icon']"
          ></i>
        </h3>
        <p
          :class="[
            'content',
            'duration-700',

            {
              active: faq.isActive
            }
          ]"
        >
          {{ faq.content }}
        </p>
        <i class="fa fa-commenting-o message"></i>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
  .card.active {
    .down-icon {
      transform: rotate(180deg);
    }
    .content {
      transform: scaleX(0);
      height: 0;
      overflow: hidden;
      position: relative;
    }
    .message {
      opacity: 0;
    }
  }
  .card {
    position: relative;
    .content {
      z-index: 10;
    }
    .message {
      transition: opacity 1s;
      opacity: 0.5;
    }
  }
  .message {
    position: absolute;
    top: 0;
    left: 8px;
    font-size: 4em;
    z-index: 1;
    color: #748ffc;
  }
</style>
