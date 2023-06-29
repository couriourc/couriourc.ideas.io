<route>
{ meta: { title: 'Mind Map' } }
</route>

<script lang="ts" setup>
  // function useMindMap
  import MindMap from './index'
</script>
<template>
  <MindMap />
</template>

<style lang="scss" scoped>
  #map {
    width: 100%;
    height: 100vh;
  }
</style>
