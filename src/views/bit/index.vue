<route>
  { meta: { title: 'BIT 树状数组 动画展示' } }
</route>
<script lang="ts" setup>
  import type { Ref } from 'vue'
  import ReturnButton from '/@/components/returnButton.vue'

  function useRTC() {
    const peerConnection = new RTCPeerConnection()
    const offer = (async function createOffer() {
      const offer = await peerConnection.createOffer()
      return offer
    })()

    const answer = async () => {
      let answer = await peerConnection.createAnswer()
      return answer
    }
    async function receiveOffer(offer) {
      // 接收到 offer 信息
      await peerConnection.setRemoteDescription(offer)
    }
    async function receiveAnswer(answer) {
      // 接收远端给的 offer
      await peerConnection.setRemoteDescription(answer)
    }

    return {
      offer: ref(offer),
      answer,
      receiveOffer,
      receiveAnswer
    }
  }

  function useCall() {
    type SupportMessageType = 'join' | 'call' | 'offer' | 'answer' | 'call_out' | 'message'
    interface MessageProp {
      message: SupportMessageType
      userId: number | string
      target?: number | string | null
      offer?: RTCSessionDescriptionInit
    }
    const room: Ref<Array<number | string>> = ref([])
    const messages: Ref<Array<MessageProp>> = ref([])
    watch(messages, () => {
      messages.value.forEach((item) => serverListener(item.message, item))
      function serverListener(eventType: SupportMessageType, events: MessageProp) {
        switch (eventType) {
          case 'message':
            break
          case 'join':
            room.value.push(events.userId)
            room.value.forEach((item) => {
              messages.value.push({
                message: 'message',
                userId: events.userId,
                target: item
              })
            })
            break
          case 'answer':
        }
      }
    })
    function peronal() {
      const userHash: number = new Date().getTime() + (Math.random() + 1) * 100
      const message = {
        userHash,
        join() {
          return {
            userId: userHash,
            target: 'all',
            message: 'join'
          }
        },
        call(targetUserId) {
          return {
            message: 'call',
            userId: userHash,
            target: targetUserId
          }
        },
        offer(targetUserId, offer) {
          return {
            offer,
            message: 'offer',
            userId: userHash,
            target: targetUserId
          }
        },
        answer(targetUserId, answer) {
          return {
            answer,
            message: 'answer',
            userId: userHash,
            target: targetUserId
          }
        },
        call_out() {
          return {
            message: 'call_out',
            userId: userHash
          }
        }
      }
      const listener = {
        join() {
          room.value.push(userHash)
        },
        call() {},
        offer() {},
        answer() {},
        call_out() {}
      }
    }
  }

  // const rtc = useRTC()
  const arr = ref([1, 2, 3, 4, 5, 4, 5])
  const laywer = ref([
    ['', 0, 0, 0, 0, 0, 0, 0],
    ['', 0, 0, 0, 0, 0, 0, 0],
    ['', 0, 0, 0, 0, 0, 0, 0],
    ['', 0, 0, 0, 0, 0, 0, 0],
    ['', 0, 0, 0, 0, 0, 0, 0],
    ['', 0, 0, 0, 0, 0, 0, 0]
  ])
  function iter_delay(duration) {
    let count = 0
    return (fn) => {
      count += 1
      setTimeout(fn, count * duration)
    }
  }
  function addBIT() {
    let delay = iter_delay(1000)
    const update = (p, x) => {
      for (let i = p; i <= laywer.value.length; i += i & -i) {
        delay(() => {
          curN.value = p
          laywer.value[(i & -i).toString(2).length - 1][i] += x
          curId.value = `${i}-${(i & -i).toString(2).length - 1}`
          curActives.value.add(curId.value)
        })
      }
    }
    // for ( let i)
    for (let i = 1; i < arr.value.length; ++i) {
      update(i, arr.value[i])
    }
  }
  let curActives = ref(new Set())
  let curId = ref('0-0')
  let curN = ref(0)
  onMounted(() => {
    addBIT()
  })
</script>
<template>
  <ReturnButton />
  <div flex flex-col content="center" text-center p-5>
    <div class="c" bg-white w="fit" m-auto shadow-lg rounded p-2>
      <div
        class="laywer"
        :style="{
          position: 'relative'
        }"
        flex
        gap-10
        v-for="(item, idx) in [...laywer].reverse()"
      >
        <div
          v-for="(er, id) in item"
          w-1em
          transition="duration-1000"
          hover="bg-blue-100"
          cursor="pointer"
          p-4
          :class="{
            active: curActives.has(`${id}-${6 - idx - 1}`)
          }"
          :k="`${id}-${6 - idx - 1} ${curId}`"
          v-show="er !== ''"
        >
          {{ er }}
        </div>
      </div>
    </div>
    <div flex gap-10 m-auto w="fit" p-2>
      <span
        w-1em
        class="arr-block"
        v-for="(item, id) in arr"
        p-4
        :class="{
          active: curN < id
        }"
      >
        {{ item }}
      </span>
    </div>
    <div text-white text-left w="70%" m-auto drop-shadow>
      <div hover="bg-white shadow-lg text-black rounded-lg" cursor="pointer" duration-400 p-3>
        <p>1.什么是树状数组？</p>
        顾名思义，就是用数组来模拟树形结构呗。那么衍生出一个问题，为什么不直接建树？答案是没必要，因为树状数组能处理的问题就没必要建树。和Trie树的构造方式有类似之处。
      </div>

      <div hover="bg-white shadow-lg text-black rounded-lg" cursor="pointer" duration-400 p-3>
        <p>2.树状数组可以解决什么问题 ?</p>
        可以解决大部分基于区间上的更新以及求和问题。
      </div>

      <div hover="bg-white shadow-lg text-black rounded-lg" cursor="pointer" duration-400 p-3>
        <p>3.树状数组和线段树的区别在哪里 ?</p>
        树状数组可以解决的问题都可以用线段树解决，这两者的区别在哪里呢？树状数组的系数要少很多，就比如字符串模拟大数可以解决大数问题，也可以解决1+1的问题，但没人会在1+1的问题上用大数模拟。
      </div>

      <div hover="bg-white shadow-lg text-black rounded-lg" cursor="pointer" duration-400 p-3>
        <p>4.树状数组的优点和缺点 ?</p>

        修改和查询的复杂度都是O(logN)，而且相比线段树系数要少很多，比传统数组要快，而且容易写。
        缺点是遇到复杂的区间问题还是不能解决，功能还是有限。
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .arr-block {
    color: black;
    background-color: gray;
  }
  .active {
    border-radius: 50%;
    background-color: rgb(0, 183, 255);
    color: white;
    background-position: center;
    background-size: 100%;
  }
</style>
