<!-- <template>
  <div class="container-404">
    <div>一级路由：404页面</div>
    <VueDragResize
      :isActive="true"
      :w="200"
      :h="200"
      v-on:resizing="resize"
      v-on:dragging="resize"
      :parentLimitation="true"
    >
      <h3>Hello World!</h3>
      <p>{{ top }} х {{ left }}</p>
      <p>{{ width }} х {{ height }}</p>
    </VueDragResize>
    <el-button @click="createResize">test</el-button>
    <div class="generateCharts" ref="generateCharts"></div>
  </div>
</template>

<script setup lang="ts">
import VueDragResize from 'vue-drag-resize/src/components/vue-drag-resize.vue'
import { ref } from 'vue'

let generateCharts = ref()

let width = ref(0)
let height = ref(0)
let top = ref(0)
let left = ref(0)

const resize = (newRect: any) => {
  width.value = newRect.width
  height.value = newRect.height
  top.value = newRect.top
  left.value = newRect.left
}

const createResize = () => {
  const newResizableBox = new VueDragResize({
    data: {
      x: 100,
      y: 100,
      width: 200,
      height: 150,
    },
  })

  if (generateCharts.value) {
    newResizableBox.$mount()
    generateCharts.value.appendChild(newResizableBox.$el)
  }

  const chartsInstance = newResizableBox.$el
  console.log(chartsInstance)
}
</script>

<style scoped>
.container-404 {
  width: 100%;
  height: 90vh;
}
</style> -->

<template>
  <div id="app">
    <button @click="createDraggableItem">创建拖拽对象</button>
    <VueDragResize
      class="vue-drag-resize-items"
      v-for="item in draggableItems"
      :key="item.id"
      :w="200"
      :h="200"
      :x="item.x"
      :y="item.y"
      @resizing="resizeItem"
      @dragging="moveItem"
    >
      <!-- 这里是你想要拖拽和调整大小的内容 -->
      拖拽和调整大小的内容
      <div
        class="vue-drag-resize-items-charts"
        style="width: 100%; height: 100%; background-color: pink"
        @resized="handleResize"
      ></div>
    </VueDragResize>
  </div>
</template>

<script>
import VueDragResize from 'vue-drag-resize/src/components/vue-drag-resize.vue'
import * as echarts from 'echarts'
export default {
  data() {
    return {
      draggableItems: [],
      nextItemId: 0,
      myChart: null,
    }
  },
  components: {
    VueDragResize,
  },
  methods: {
    async createDraggableItem() {
      await this.draggableItems.push({
        id: this.nextItemId++,
        x: 0,
        y: 0,
        w: 200,
        h: 150,
      })
      // 获取非响应式的实例
      // const dragItems = this.$refs.dragItems
      const dragItems = document.querySelectorAll('.vue-drag-resize-items')
      // const newDraggableInstance = dragItems[dragItems.length - 1]
      let container = document.querySelector('.vue-drag-resize-items-charts')
      this.myChart = echarts.init(container)
      this.myChart.setOption({
        title: {
          text: 'ECharts 入门示例',
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      })
      await document
        .querySelector('.content-container')
        .addEventListener('resize', function () {
          console.log('触发了resize')
          this.myChart.resize()
        })

      console.log(document.querySelector('.vue-drag-resize-items'))
      console.log(dragItems)
      console.log(this.draggableItems)
    },
    moveItem(id, left, top) {
      const item = this.draggableItems.find((item) => item.id === id)
      if (item) {
        item.x = left
        item.y = top
      }
    },
    resizeItem(id, left, top, width, height) {
      const item = this.draggableItems.find((item) => item.id === id)
      if (item) {
        item.x = left
        item.y = top
        item.w = width
        item.h = height
      }
      // this.myChart.resize()
    },
    handleResize() {
      console.log('执行了')
    },
  },
}
</script>
