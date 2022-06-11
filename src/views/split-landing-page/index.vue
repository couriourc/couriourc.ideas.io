<route>
{ meta: { title: 'Split Landing Page' } }
</route>

<script setup></script>

<template>
  <div class="split-landing-container flex">
    <div
      class="tom"
      w="50%"
      h="screen"
      bg="green-500"
      hover="w-90vw"
      ease
      duration="1000"
      flex
      justify="center"
      items="center"
      flex-col
      relative
      gap-10
    >
      <section uppercase>
        <h1 class="font-20" font="bold" text-white>Tom</h1>
      </section>
      <button
        border="2px light-50"
        outline="none"
        duration="1000"
        text="light-200"
        bg="transparent"
        p="50px"
        hover="bg-#4263eb border-#4263eb"
        rounded-lg
        uppercase
        >Content</button
      >
    </div>
    <div
      class="jerry"
      w="50%"
      h="screen"
      bg="blue-500"
      hover="w-90vw"
      duration="1000"
      justify="center"
      items="center"
      relative
      ease
      flex
      flex-col
      gap-10
    >
      <section uppercase>
        <h1 class="font-20" font="bold" text-white> Jerry</h1>
      </section>

      <button
        border="2px light-50"
        outline="none"
        duration="1000"
        text="light-200"
        bg="transparent"
        p="50px"
        hover="bg-green-500 border-green-500"
        rounded-lg
        uppercase
        >Content</button
      >
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .tom {
    background-image: url(../../assets/split-landing-page/tom.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
  .jerry {
    background-image: url(../../assets/split-landing-page/jerry.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
</style>
