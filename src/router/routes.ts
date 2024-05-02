// 对外暴露常量路由
export const constantRoute = [
  {
    path: '/', // 首页
    component: () => import('@/views/home/index.vue'),
    name: 'home',
  },
  {
    path: '/login', // 登陆
    component: () => import('@/views/login/index.vue'),
    name: 'login',
  },
  {
    path: '/layout', // 主页
    component: () => import('@/layout/index.vue'),
    name: 'layout',
  },
  {
    path: '/workspace', // 工作台
    component: () => import('@/views/workspace/index.vue'),
    name: 'workspace',
  },
  {
    path: '/404', // 404
    component: () => import('@/views/404/index.vue'),
    name: '404',
  },
  {
    path: '/datahanle',
    component: () => import('../views/data_handling/index.vue'),
    name: 'datahanle',
  },
]
