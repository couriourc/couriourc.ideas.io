<route>
{ meta: { title: 'Form Wave' } }
</route>

<script lang="ts" setup></script>
<template>
  <div class="form-wave-container flex justify-center items-center h-screen w-screen">
    <form class="form w-300px rounded-md" action="/login" method="post">
      <h2 class="text-light-50 py-0 my-0 text-center select-none"> Please Login !</h2>
      <div class="form-control flex flex-col-reverse text-white select-none" m="y-10">
        <input
          class="input__item"
          outline-none
          bg-transparent
          border="b-2px b-light-800 t-none r-none l-none"
          type="email"
          required
        />
        <label class="input-placeholder duration-700 pointer-events-none">
          <span
            v-for="(alpha, index) in 'Email'"
            :key="alpha"
            class="alpha"
            v-text="alpha"
            :style="{ 'transition-delay': `${index * 50}ms` }"
          ></span>
          <!-- Email -->
        </label>
      </div>

      <div class="form-control flex flex-col-reverse text-white select-none" m="y-10">
        <input
          class="input__item"
          bg-transparent
          outline-none
          border="b-2px b-light-800 t-none r-none l-none"
          type="password"
          required
        />

        <label class="input-placeholder pointer-events-none duration-700">
          <span
            v-for="(alpha, index) in 'Password'"
            :key="alpha"
            class="alpha"
            transform="translate-y-3"
            v-text="alpha"
            :style="{ 'transition-delay': `${index * 50}ms` }"
          ></span>
          <!-- Password  -->
        </label>
      </div>
      <button
        bg-lightblue
        underline="none"
        border-none
        block
        w="90%"
        p-12px
        text-white-400
        v-waves
        rounded-lg
        m-auto
        title="原本是登录，这里先换成了 Return"
        @click="$router.replace('/')"
      >
        Return
      </button>
      <p class="tips text-light-100">
        Don't have an account? <a href="/" class="text-green-200">Register</a>
      </p>
    </form>
  </div>
</template>
<style lang="scss" scoped>
  .form {
    background: rgba(0, 0, 0, 0.4);
    padding: 1em;
    .form-control {
      .input-placeholder {
        .alpha {
          display: inline-block;
          font-size: 18px;
          min-width: 5px;
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      }
      .input__item:focus {
        & + .input-placeholder {
          .alpha {
            color: antiquewhite;
            transform: translateY(-20px);
          }
        }
      }
    }
  }
</style>
