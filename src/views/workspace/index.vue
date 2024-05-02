<!-- <template>
  <VueDragResize
    class="vue-drag-resize-items"
    :w="200"
    :h="200"
    @resizing="resizeItem"
    @dragging="moveItem"
  >
    <div id="main" style="width: 100%; height: 100%"></div>
  </VueDragResize>
</template>

<script setup lang="ts">
import VueDragResize from 'vue-drag-resize/src/components/vue-drag-resize.vue'
import * as echarts from 'echarts'
import { onMounted } from 'vue'

let myChart
let myCharts_options = {
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
}

onMounted(() => {
  myChart = echarts.init(document.getElementById('main'))
  myChart.setOption(myCharts_options)
})

const moveItem = () => {
  console.log('移动了')
}
const resizeItem = () => {
  console.log('大小发生变化了')

  myChart.resize()
}
</script>

<style scoped></style> -->

<template>
  <div class="main">
    <el-button @click="handleClick">创建对象</el-button>
    <VueDragResize
      class="vue-drag-resize-item"
      v-for="item in draggableItems"
      :key="item.id"
      :w="200"
      :h="200"
      @resizing="resizeItem(item.id)"
      @dragging="moveItem"
      @activated="onActivated"
      @deactivated="onDeactivated"
    >
      test
      <div class="chartsContainer" style="width: 100%; height: 100%"></div>
    </VueDragResize>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VueDragResize from 'vue-drag-resize/src/components/vue-drag-resize.vue'
import * as echarts from 'echarts'

let draggableItems = ref([])
let nextItemId = 0
let option = {
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
}
let chartInstance = []

const handleClick = async () => {
  await draggableItems.value.push({
    id: nextItemId,
    w: 200,
    h: 200,
  })
  let myChart = echarts.init(
    document.querySelectorAll('.chartsContainer')[nextItemId],
  )
  chartInstance.push(myChart)
  nextItemId++
  myChart.setOption(option)
}

const resizeItem = (id) => {
  chartInstance[id].resize()
  console.log('resizing')
}

const moveItem = () => {
  console.log('moving')
}

const onActivated = () => {
  console.log('激活了')
}

const onDeactivated = () => {
  console.log('失去焦点')
}
</script>

<style scoped></style>
