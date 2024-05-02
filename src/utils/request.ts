// 进行axios的二次封装
import axios from 'axios'
import { ElMessage } from 'element-plus'

// 1. 使用axios对象的create方法，创建axios实例
// （其他配置：基础路径、超时的时间）
const request = axios.create({
  // 基础路径
  baseURL: import.meta.env.VITE_APP_BASE_API, // 基础路径上会携带 /api
  timeout: 5000, // 超时时间的设置
})

// 2. request实例添加请求与响应拦截器
request.interceptors.request.use((config) => {
  // config配置对象，headers属性请求头，经常给服务器端携带公共参数
  // 返回配置对象
  // if (config.method == 'post') {
  // console.log('config')
  // config.data = JSON.stringify(config.data)
  // console.log(config.data)
  // }
  return config
})

// 3. 响应拦截器
request.interceptors.response.use(
  // 成功的回调
  (response) => {
    console.log(response.data)
    return response.data
  },
  // 失败的回调
  (error) => {
    // 处理http网络错误
    let message = '' // 定义一个变量：存储网络错误信息
    const status = error.response.status // http状态码
    switch (status) {
      case 401:
        message = 'token过期'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务出现问题'
        break
      default:
        message = '网络出现问题'
        break
    }
    console.log(message)
    // 提示错误信息
    ElMessage({
      type: 'error',
      message,
    })
    return Promise.reject(error)
  },
)

// 4. 对外暴露
export default request
