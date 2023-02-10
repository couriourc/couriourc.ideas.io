<route>
{ meta: { title: 'Tree Graph' } }
</route>

<script lang="ts" setup>
  import * as d3 from 'd3'
  import { Ref } from 'vue'
  import { nodes, edges } from '/@/assets/tree-graph/data.json'
  let svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>
  let selectNode
  let painter
  let router = useRouter()
  const [width, height]: Array<Ref<number>> = useResize()
  const x: Ref<number> = ref(0),
    y: Ref<number> = ref(0)
  const menuVisible = ref(false)

  //新建一个颜色比例尺
  let scaleColor = d3.scaleOrdinal().range(d3.schemeCategory10)
  function initSvg() {
    svg = d3.select('svg')
  }

  function drawTree() {
    // 编组 记作为 binary-tree
    let binaryTreeGroup
    let relationEdges
    let treeNode
    let forceSimulation
    function initAccessory() {
      svg
        // 制作一个箭头
        .append('marker')
        .attr('id', 'markerArrow')
        .attr('markerUnits', 'userSpaceOnUse')
        .attr('viewBox', '0 -5 10 10') //坐标系的区域
        .attr('refX', 34) //箭头坐标
        .attr('refY', -1)
        .attr('markerWidth', 12) //标识的大小
        .attr('markerHeight', 12)
        .attr('orient', 'auto') //绘制方向，可设定为：auto（自动确认方向）和 角度值
        .attr('stroke-width', 2) //箭头宽度
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5') //箭头的路径
        .attr('fill', '#000000') //箭头颜色
      svg // 定义一个阴影
        .append('defs')
        .append('filter')
        .attr('result', 'offOut')
    }
    function initBinaryTreeGroup() {
      binaryTreeGroup = svg.append('g').attr('class', 'binary-tree-panel')
      initAccessory()
    }
    // initBinaryTreeGroup()
    // 绘制节点 分组，也即是说单个节点是由一个 circle + text 组成
    function createNode(...anotherNode) {
      let _treeNode = binaryTreeGroup
        // 所有的节点单独在一个边
        .selectAll('.circle')
        .data([...anotherNode])
        .enter()
        .append('g')
      _treeNode
        .append('circle')
        .attr('r', 50)
        .attr('id', (d) => d.name)
        .attr('fill', (_, i) => scaleColor(i))
      _treeNode.append('text').text((d) => d.name)

      function start(event) {
        if (!event.active) {
          //event.active 属性对判断并发的拖拽手势序列中的 start 事件和 end 事件: 在拖拽手势开始时为0，在拖拽结束最后一个手势事件时为0
          //这里就是drag的过程中
          forceSimulation.alphaTarget(0.8).restart() //设置衰减系数，对节点位置移动过程的模拟，数值越高移动越快，数值范围[0，1]
        }

        event.subject.fx = event.subject.x
        event.subject.fy = event.subject.y
      }

      function drag(event) {
        event.subject.fx = event.x
        event.subject.fy = event.y
        console.log(event)
      }

      function end(event) {
        if (!event.active) {
          forceSimulation.alphaTarget(0)
        }
        event.subject.fx = null
        event.subject.fy = null
      }
      _treeNode.call(
        d3
          .drag() //相当于移动端的拖拽手势  分以下三个阶段
          .on('start', start)
          .on('drag', drag)
          .on('end', end)
      )

      _treeNode.on('click', (event, d) => {
        console.log(d)
        selectNode = d
        x.value = event.x
        y.value = event.y
        function showMenu() {
          menuVisible.value = true
        }
        showMenu()
      })
      return _treeNode
    }
    // 创建边关系
    function createRelation(...anotherRelation) {
      let _relationEdges = binaryTreeGroup
        .selectAll('line')
        .data([...anotherRelation])
        .join('line')
        .attr('class', 'tree-relation')
        .attr('stroke', (_, i) => scaleColor(i))
        .attr('stroke-width', '1')
        .attr('marker-end', 'url(#markerArrow)')

      _relationEdges // 根据节点信息 连接相关边
        .append('text')
        .text((d) => d.relation)
      //设置图形 中心点
      // 创建力学导向信息
      return _relationEdges
      //生成节点数据
    }
    function creatForceSimulation(...data) {
      let _forceSimulation = d3
        .forceSimulation([...data])
        .force('charge', d3.forceManyBody())
        .force('center', d3.forceCenter(width.value / 2, height.value / 2))
      function linksTick() {
        let curNode, targetNode
        treeNode //设置中心
          .attr('transform', (d) => {
            curNode = data.find((item) => item.name === d.name) ?? { x: 0, y: 0 }
            curNode.x = d.fx ? d.fx : d.x
            curNode.y = d.fy ? d.fy : d.y
            if (d.name === 'new-node') {
              console.log(d)
            }
            return `translate(${curNode.x} ,${curNode.y})`
          })

        relationEdges
          .attr('x1', (d) => {
            curNode = data.find((item) => item.name === d.source) ?? { x: 0, y: 0 }
            return curNode.x
          })
          .attr('y1', (d) => {
            curNode = data.find((item) => item.name === d.source) ?? { x: 0, y: 0 }

            return curNode.y
          })
          .attr('x2', (d) => {
            targetNode = data.find((item) => item.name === d.target) ?? { x: 0, y: 0 }

            return targetNode.x
          })
          .attr('y2', (d) => {
            targetNode = data.find((item) => item.name === d.target) ?? { x: 0, y: 0 }
            return targetNode.y
          })
      }

      _forceSimulation.on('tick', linksTick)
      _forceSimulation.restart()

      return _forceSimulation
    }
    function createListener() {
      //新建一个力导向图

      function zoomed(event) {
        binaryTreeGroup.attr('transform', event.transform)
      }

      svg.call(
        d3
          .zoom()
          .scaleExtent([1 / 2, 8])
          .on('zoom', zoomed)
      )
    }
    function addNode(...another) {
      let newNodes = createNode(...another)
      treeNode = treeNode.merge(newNodes)
      forceSimulation = creatForceSimulation(...another, ...nodes)
    }
    function addRelation(...another) {
      let newRelation = createRelation(...another)
      relationEdges = relationEdges.merge(newRelation)
    }

    return {
      treeNode,
      relationEdges,
      initBinaryTreeGroup,
      createNode: (...nodes) => (treeNode = createNode(...nodes)),
      createRelation: (...edges) => (relationEdges = createRelation(...edges)),
      createListener,
      creatForceSimulation: (...nodes) => (forceSimulation = creatForceSimulation(...nodes)),
      addNode,
      addRelation
    }
  }
  function addNode() {
    let newNode = {
      name: 'new-node',
      x: selectNode.x + 150,
      y: selectNode.y + 150
    }

    let newRelation = {
      source: selectNode.name,
      target: newNode.name
    }
    painter.addNode(newNode)
    painter.addRelation(newRelation)
    painter.createListener()
  }
  function useResize() {
    const width: Ref<number> = ref(window.innerWidth || document.body.offsetHeight)
    const height: Ref<number> = ref(window.innerHeight || document.body.offsetWidth)
    window.addEventListener('resize', () => {
      width.value = window.innerWidth || document.body.offsetWidth
      height.value = window.innerHeight || document.body.offsetHeight
    })
    return [width, height]
  }
  function bindHotKey() {
    window.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        menuVisible.value = false
      }
    })
  }
  onMounted(() => {
    initSvg()
    painter = drawTree()
    painter.initBinaryTreeGroup()
    painter.createNode(...nodes)
    painter.createRelation(...edges)
    painter.creatForceSimulation(...nodes)
    painter.createListener()
    bindHotKey()
  })
</script>

<template>
  <svg class="bg-white-300" z-0 :width="width" :height="height">
    <rect />
  </svg>
  <button
    fixed
    top="0"
    left="0"
    right-0
    bottom-0
    m-auto
    w="fit"
    p-2em
    transition="duration-200"
    hover="text-white bg-green-300"
    h-fit
    bg-white
    outline="none"
    shadow="lg"
    rounded-sm
    border="transparent"
    @click="router.replace('/')"
  >
    返回首页
  </button>
  <Teleport :to="'body'">
    <ul
      v-if="menuVisible"
      :style="{
        transform: 'translate(' + x + 'px,' + y + 'px)'
      }"
      transition="duration-500"
      class="menu"
      fixed
      top-0
      left-0
      z-1000
      p-2
      rounded-lg
      shadow-lg
      bg-white
      list="none"
    >
      <li
        hover="bg-blue text-white"
        rounded-lg
        v-waves
        transition="duration-100"
        pointer-cursor
        p-2
        @click="addNode"
      >
        添加节点</li
      >

      <li
        text="#9aa7b1"
        rounded-lg
        transition="duration-100"
        pointer-events-none
        cursor="not-allowed"
        p-2
        >移除节点</li
      >
    </ul>
  </Teleport>
</template>
