import { createRouter, createWebHashHistory } from 'vue-router' // 通过vue-router插件实现路由配置
import { constantRoute } from './routes' // 引入routes配置项

// 创建路由
const router = createRouter({
  history: createWebHashHistory(), // 路由模式hash
  routes: constantRoute,

  // 滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router
