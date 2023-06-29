import { defineComponent } from 'vue'
import MindElixir from 'mind-elixir'
import { onMounted, ref } from 'vue'
function useMindMap() {
  let me: MindElixir = null
  // 设置脑图的数据信息
  const data = ref({})
  // 设置脑图主题信息
  const theme = ref({})
  // 配置脑图信息
  const settings = ref({})

  onMounted(() => {
    me = new MindElixir({
      el: '#map',
      direction: MindElixir.LEFTA,
      allowUndo: true,
      // data: example,
      contextMenuOption: {
        focus: true,
        link: true,
        extend: []
      },
      before: {
        insertSibling(el, obj) {
          return true
        },
        async addChild(el, obj) {
          return true
        }
      }
    })
    me.init({
      // ...examp le,
      ...me,
      nodeData: {
        id: 'default-data',
        root: true,
        topic: '脑图中心'
      }
    })
  })

  return {
    theme,
    settings,
    data,
    use(fn) {
      nextTick(() => {
        // fn.call(me, me)
        me.install(fn)
      })
      return this
    }
  }
}
export default defineComponent({
  name: 'MindMap',
  setup() {
    useMindMap().use(function (mind) {
      console.log(mind.container)
      const dom = mind.container.querySelector('.mind-elixir-toolbar.lt')
      // console.log(dom)
      const downloadButton = document.createElement('span')
      downloadButton.innerHTML = 'D'
      downloadButton.addEventListener('click', () => {
        console.log(mind.getData())
      })
      dom.append(downloadButton)
    })
    return () => <div id="map"></div>
  }
})
