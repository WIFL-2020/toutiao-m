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
    // name: 'layout',
    component: () => import('@/views/layout'),
    children: [
      {
        // 默认子路由
        path: '',
        name: 'home',
        component: () => import('@/views/home')
      }, {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa')
      }, {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video')
      }, {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  }
]

const router = new VueRouter({
  routes
})

export default router
