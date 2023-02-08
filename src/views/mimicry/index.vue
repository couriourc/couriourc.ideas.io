<route>
{ meta: { title: 'Mimicry Button' } }
</route>
<script lang="ts" setup></script>
<template>
  <ReturnButton />
  <button class="mimicry w-10em h-4em rounded-lg outline-none border-none ">

  </button>
</template>
<style lang="scss">
.mimicry {
  position: fixed;
  top: 50%;
  left: 50%;
  background: #eeeeee;
  animation-name: float-pop;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-play-state: running;
  animation-iteration-count: infinite;

  box-shadow: inset 0 0 0 6px #0022ff,
  inset 0 0 3px 10px white,
  -6px -6px 16px 4px transparentize(rgba(255, 255, 255, 1), .7),
  6px 6px 16px 4px transparentize(rgba(0, 0, 0, 1), .5);

  &::after {
    content: '';
    border-radius: 20%;
    width: 60%;
    display: inline-block;
    height: .5em;
    position: absolute;
    bottom: -40px;
    left: 50%;
    transform: translateX(-50%) skewX(-30deg);
    box-shadow: inset 6px 6px 16px 4px transparentize(rgba(0, 0, 0, 1), .5);
  }

  &:active {

    box-shadow: inset 0 0 0 6px #ff003b,
    inset 0 0 3px 10px white,
    -6px -6px 16px 4px transparentize(rgba(255, 255, 255, 1), .7),
    6px 6px 16px 4px transparentize(rgba(0, 0, 0, 1), .5);

  }
}

//
//@keyframes float-pop {
//  0% {
//    transform: translate(-50%, 0);
//  }
//  33% {
//    transform: translate(-50%, 10px);
//  }
//  66% {
//    transform: translate(-50%, 0px);
//  }
//  99% {
//    transform: translate(-50%, -10px);
//  }
//}
</style>
