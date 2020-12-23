import Vue from 'vue'
import VueRouter from 'vue-router'
import { Dialog } from 'vant'
import store from '@/store'

Vue.use(VueRouter)
// 路由表
const routes = [
  {
    // 路由路径
    path: '/login',
    // 路由的名字
    name: 'login',
    // 路由组件                懒加载
    component: () => import('@/views/login'),
    meta: {
      requireAuth: false
    }
  }, {
    path: '/',
    // name: 'layout',
    component: () => import('@/views/layout'),
    children: [
      {
        // 默认子路由
        path: '',
        name: 'home',
        component: () => import('@/views/home'),
        meta: {
          requireAuth: false
        }
      }, {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa'),
        meta: {
          requireAuth: true
        }
      }, {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video'),
        meta: {
          requireAuth: false
        }
      }, {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my'),
        meta: {
          requireAuth: false
        }
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    // 将路由动态参数映射到组件的 props 中，更推荐这种做法
    props: true,
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile/index.vue'),
    meta: {
      requireAuth: false
    }
    // 将路由动态参数映射到组件的 props 中，更推荐这种做法
  }
]

const router = new VueRouter({
  routes
})

// 路由导航首位
router.beforeEach(async (to, from, next) => {
  // to 要访问的路径
  // from 从哪里来的
  // next() 直接放行
  // 不需要登录的路由，直接放行
  if (!to.meta.requireAuth) return next()
  const { user } = store.state
  // store 里面具备 token，说明登录过了，直接放行
  if (user && user.token) return next()

  const r = await Dialog.confirm({
    title: '提示',
    message: '是否需要登录？'
  }).then(r => r).catch(e => e)
  if (r === 'confirm') {
    // 点了确定
    redirectLogin()
  } else {
    // 点了取消，next(false) 取消路由跳转
    next(false)
  }
})

function redirectLogin () {
  router.replace({
    name: 'login',
    query: {
      // router.currentRoute => this.$route
      redirect: router.currentRoute.fullPath
    }
  })
}

export default router
