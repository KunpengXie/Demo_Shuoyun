<template>
  <div class="container">
    数据处理界面
    <div>
      <hot-table :settings="hotSettings" ref="hotTableComponent"></hot-table>
    </div>
    <el-button @click="swapHotData">load new data</el-button>
    <div>
      <el-upload
        class="upload-demo"
        action=""
        drag
        accept=".xlsx, .xls, .csv"
        :auto-upload="false"
        :show-file-list="false"
        :on-change="handleUpload"
        multiple
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          Drop file here or
          <em>click to upload</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            jpg/png files with a size less than 500kb
          </div>
        </template>
      </el-upload>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import { HotTable } from '@handsontable/vue3'
import { registerAllModules } from 'handsontable/registry'
import 'handsontable/dist/handsontable.full.css'
import { ref } from 'vue'
import * as xlsx from 'XLSX'
import type { UploadFile } from 'element-plus'
import { readFile } from '../../utils/tool'

// console.log(XLSX)

registerAllModules()

let hotSettings = ref({
  data: [
    ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1'],
    ['A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2', 'I2', 'J2'],
    ['A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'H3', 'I3', 'J3'],
    ['A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4', 'H4', 'I4', 'J4'],
    ['A5', 'B5', 'C5', 'D5', 'E5', 'F5', 'G5', 'H5', 'I5', 'J5'],
    ['A6', 'B6', 'C6', 'D6', 'E6', 'F6', 'G6', 'H6', 'I6', 'J6'],
  ],
  colHeaders: true,
  rowHeaders: true,
  height: 'auto',
  autoWrapRow: true,
  autoWrapCol: true,
  licenseKey: 'non-commercial-and-evaluation',
})
let hotTableComponent = ref()

const swapHotData = (newData: any) => {
  hotTableComponent.value.hotInstance.loadData(newData)
}

const handleUpload = async (event: UploadFile) => {
  // console.log(event)
  let file = event.raw
  if (!file) {
    // 如果文件不存在
    return
  }
  // 读取文件中的内容
  let data = await readFile(file) // 这里会把xlsx文件转换为二进制形式
  // console.log(data)
  let workbook = xlsx.read(data, { type: 'binary' }) // 读取转化为二进制的数据
  // console.log(workbook)
  let worksheet = workbook.Sheets[workbook.SheetNames[0]] // 选取工作表
  // let data_sheets1: any = xlsx.utils.sheet_to_json(worksheet) // 将工作表中的数据转会为json对象
  let data_sheets1: any = xlsx.utils.sheet_to_csv(worksheet) // 将工作表中的数据转会为json对象
  console.log(data_sheets1) // 解析后的数据
  // console.log(typeof data_sheets1[0])
  if (typeof data_sheets1[0] === 'object') {
    console.log(Object.keys(data_sheets1[0])) // 获得所有的键名
  }
  swapHotData(data_sheets1)
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100vh;
}
</style>
