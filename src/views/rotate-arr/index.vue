<route>
  { meta: { title: 'Rotating Array' } }
</route>

<script lang="ts" setup>
  import { ref, computed, watch, type Ref } from 'vue'

  enum Direction {
    Top,
    Left,
    Right,
    Bottom
  }

  const arr = ref(new Array(16).fill(0).map((_, idx) => idx))

  const width = computed<number>({
    get() {
      return ~~Math.sqrt(arr.value.length)
    },
    set(newValue) {
      arr.value = new Array(newValue * newValue).fill(0).map((_, idx) => idx)
      // 当宽度发生了变化
      return true
    }
  })
  const height = width

  function useDelayed<T>(target: Ref<T>, delay: number) {
    let _origin = target.value
    let queue = ref([])
    let pending = []
    let ing: number[] = []

    let lock = false
    watch(queue, () => {
      // 当这一批队列没完成的时候，加入下一批等待队列
      // 实现串行调度
      // 如果有元素,但是没有执行完，那就放入延迟队列

      for (let i = 0; i < queue.value.length; ++i) {
        // 推迟赋值
        ing.push(
          setTimeout(() => {
            target.value = queue.value.shift()
            if (!queue.value.length) {
              // 本次做完了，释放锁
              lock = false
              // 本批次执行完，检查 pending
              if (pending.length)
                // 还有等待任务，继续处理
                queue.value = pending.shift()
            }
          }, i * delay)
        )
      }
    })

    watch(width, () => {
      // 当宽度都发生了变化，重置所有信息
      queue.value = []
      pending = []
      lock = false
      target.value = _origin
      ing.forEach(clearTimeout)
    })

    const proxyQueue = computed({
      get() {
        return queue.value
      },
      set(newValue) {
        if (lock) {
          // 如果没有执行完，这一批的信息就暂时放到任务队列
          pending.unshift(newValue)
          console.log(`当前等待任务还有: ${pending.length} 个`)
          return
        }
        // 并行调度任务
        lock = true
        queue.value = newValue
      }
    })

    return proxyQueue
  }
  const cur = ref<number | null>(null)
  const queue = useDelayed(cur, 1000)
  function rotate() {
    // 得到中心
    let direction: Direction = Direction.Top
    let circle = 1
    let curX = 0
    let curY = 0
    let res = []

    while (circle < width.value) {
      // 当前环   \\
      // 执行第一轮 \\
      if (direction === Direction.Top) {
        while (curX < width.value - circle) {
          res.push(arr.value[curX + curY * width.value])
          curX++
        }
        direction = Direction.Left
      }
      if (direction === Direction.Left) {
        while (curY < height.value - circle) {
          res.push(arr.value[curX + curY * width.value])
          curY++
        }
        direction = Direction.Bottom
      }
      if (direction === Direction.Bottom) {
        while (curX > circle - 1) {
          res.push(arr.value[curX + curY * width.value])
          curX--
        }
        direction = Direction.Right
      }
      if (direction === Direction.Right) {
        while (curY > circle) {
          res.push(arr.value[curX + curY * width.value])
          curY--
        }
        direction = Direction.Top
      }
      circle++
    }
    queue.value = res
    return res
  }
</script>

<template>
  <div flex justify="center" flex-col items-center h-screen>
    <transition-group tag="ul" name="switch" max="10" bg-white p-6 rounded-lg>
      <input placeholder="请输入矩阵个数" v-model="width" key="input" type="number" />
      <li
        v-for="item in arr"
        :key="item"
        class="items"
        :class="{
          active: cur === item
        }"
      >
        {{ item + 1 }}
      </li>
      <button @click="rotate" key="button">Rotate</button>
    </transition-group>
  </div>
</template>

<style>
  #app {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  ul {
    display: grid;
    grid-template-rows: 20px repeat(v-bind(width), 50px) 30px;
    grid-template-columns: repeat(v-bind(height), 50px);
    gap: 12px;
    overflow: hidden;
  }

  input {
    grid-column: span v-bind(width);
    outline: none;
    border: #57606f solid 1px;
  }

  li {
    background-color: #57606f;
    color: white;
    display: flex;
    justify-content: center;
    place-items: center;
    box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    transition: background 0.5s ease;
  }

  li.active {
    background-color: #ffc048;
  }

  .switch-move,
  .switch-leave-active,
  .switch-enter-active,
  .switch-enter-to,
  .switch-enter-from {
    transition: all 1s;
  }

  .switch-leave-active,
  .switch-enter-to {
    opacity: 0;
    transform: rotate(0deg);
  }

  .switch-enter-active {
    opacity: 0.5;
  }

  button {
    border: none;
    background-color: #2ed573;
    color: white;
    border-radius: 6px;
    box-shadow: 1px 1px 3px 1px #7bed9f;
    cursor: pointer;
    grid-column: span v-bind(width);

    transition: box-shadow 0.1s ease;
  }

  button:hover {
    box-shadow: 2px 2px 3px 1px #7bed9f;
    filter: drop-shadow(2px 2px 6px 2px #7bed9f);
  }
</style>
