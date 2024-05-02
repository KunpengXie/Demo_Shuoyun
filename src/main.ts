import { createApp } from 'vue'
import App from './App.vue'
//导入svg图标
import 'virtual:svg-icons-register'

//引入element-plus插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App)
// 引入路由
import router from './router/index'
// 注册模板路由
app.use(router)
//@ts-expect-error忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

app.use(ElementPlus, {
  locale: zhCn,
})

app.mount('#app')
