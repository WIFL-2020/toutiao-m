import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 路由表
const routes = [
  {
    // 路由路径
    path: '/login',
    // 路由的名字
    name: 'login',
    // 路由组件                懒加载
    component: () => import('@/views/login')
  }, {
    path: '/',
    name: 'layout',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '/',
        name: 'layout',
        component: () => import('@/views/layout')
      }, {
        path: '/',
        name: 'layout',
        component: () => import('@/views/layout')
      }, {
        path: '/',
        name: 'layout',
        component: () => import('@/views/layout')
      }, {
        path: '/',
        name: 'layout',
        component: () => import('@/views/layout')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
