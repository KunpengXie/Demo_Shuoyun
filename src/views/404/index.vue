<template>
  <el-row>
    <el-col :span="12">
      <el-menu>
        <el-sub-menu
          v-for="(item, subIndex) in uploadTableDataItemList"
          :key="subIndex"
          :index="subIndex.toString()"
        >
          <template #title>
            <!-- 坑：这里因该注册一个事件，提供给用户修改文件名称 -->
            <!-- 坑：删除文件没有处理 -->
            <span class="data-pivot-has-file-tip">
              [{{ item.workFile }}]{{ item.sheetName }}
            </span>
          </template>
          <VueDraggable
            v-model="item.dataColumn"
            :animation="150"
            ghostClass="ghost"
            :group="{ name: 'axis', pull: 'clone', put: false }"
            :sort="false"
            :clone="onClone"
            @clone="handleClone(item.workFile, item.sheetName)"
            @dragend="draggableEnd"
          >
            <el-menu-item
              v-for="element in item.dataColumn"
              :key="element.id"
              :index="element.renderColumn"
            >
              <!-- 坑：以后这里可以做一个复选框，后面也可以添加3个点，做一个鼠标右击的点击事件，点击显示菜单，用于数据修改 -->
              <span>[ {{ element.types }} ] {{ element.renderColumn }}</span>
            </el-menu-item>
          </VueDraggable>
        </el-sub-menu>
      </el-menu>
    </el-col>
    <el-col :span="12">
      <el-menu>
        <VueDraggable
          v-model="renderData"
          :group="{ name: 'axis' }"
          :animation="150"
          @end="HandleEnd"
          @add="HandleAdd"
          ghostClass="ghost"
          :disabled="false"
        >
          <div class="axios-data-empty-x" v-show="renderData.length <= 0">
            请在此处添加数据字段
          </div>

          <el-tooltip
            v-for="(item, index) in renderData"
            :key="item.id"
            effect="light"
            :content="item.renderColumn"
            placement="left"
          >
            <el-menu-item :index="item.id" :key="item.id">
              <span>{{ item.renderColumn }}</span>
              <el-icon @click="removeDraggableAxisData(index)">
                <!-- todo 坑：删除功能-->
                <Close />
              </el-icon>
            </el-menu-item>
          </el-tooltip>
        </VueDraggable>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus' // 表单拖拽组件
import { ref, reactive, Ref } from 'vue'
// import * as _ from 'lodash'
import { Close } from '@element-plus/icons-vue'

type chartsAxisDataType = {
  fileName: string
  sheetName: string
  renderColumn: string
  types: string
  id: string
}

type sheetType = {
  workFile: string
  sheetName: string
  dataColumn: chartsAxisDataType[]
}

const uploadTableDataItemList: Ref<sheetType[]> = ref([
  {
    workFile: 'testCSV',
    sheetName: 'sheet1',
    dataColumn: [
      {
        fileName: 'testCSV',
        sheetName: 'sheet1',
        renderColumn: 'crim',
        types: 'number',
        id: 'test-01',
      },
      {
        fileName: 'testCSV',
        sheetName: 'sheet1',
        renderColumn: 'zn',
        types: 'number',
        id: 'test-02',
      },
      {
        fileName: 'testCSV',
        sheetName: 'sheet1',
        renderColumn: 'rm',
        types: 'number',
        id: 'test-03',
      },
      {
        fileName: 'testCSV',
        sheetName: 'sheet1',
        renderColumn: 'age',
        types: 'number',
        id: 'test-04',
      },
    ],
  },
])

const renderData: Ref<chartsAxisDataType[]> = ref([])

const cloneSignal = reactive({
  fileName: '',
  sheetName: '',
}) // 该变量用于存储表的名字，用于找到该字段是那张表的，用于clone

const onClone = (elements: any): chartsAxisDataType => {
  /**
   * 可以打印出克隆元素的值，并对该值进行处理，返回为需要的格式
   */

  // todo
  // 坑：这里需要先判断是何种类型的图表，判断需要几种数据，根据crrentCharts
  console.log(elements)

  return {
    fileName: elements.fileName,
    sheetName: elements.sheetName,
    renderColumn: elements.renderColumn,
    types: elements.types,
    id: elements.id + '-clone',
  }
}

const handleClone = (fileName: string, sheetName: string) => {
  /**
   * 当clone事件发生的时候，可以使用该事件来得到当前处理的表格名
   */
  // console.log(fileName, sheetName)
  // cloneSheetName.value = name
  // console.log(cloneSheetName.value)
  cloneSignal.fileName = fileName
  cloneSignal.sheetName = sheetName
}

const draggableEnd = async () => {
  /**
   * 当拖动结束时触发
   * 坑：下一次从这里开始
   */
  cloneSignal.sheetName = ''
  cloneSignal.fileName = ''
}

const HandleEnd = () => {
  renderData.value = renderData.value.filter((item: any) => item != undefined)
  // let handleProxy: any = []
  // renderData.value.forEach((item) => {
  //   handleProxy.push(Object.assign({}, item))
  // })
  // renderData = renderData.filter((item) => item != undefined)
  console.log('HandleEnd', renderData.value)
}

const HandleAdd = () => {
  console.log(renderData.value)
}

const removeDraggableAxisData = (index: number) => {
  renderData.value.splice(index, 1)
  renderData.value = reactive([...renderData.value])
  console.log(renderData.value)

  // renderData.value = renderData.value.filter(-->
  //   <!--  //   (elements) => !_.isEqual(item, elements)
}
</script>

<style scoped></style>
