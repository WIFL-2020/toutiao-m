import Vue from 'vue'
import Vuex from 'vuex'

import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    // 一个对象 用于存储登录信息 （token信息 ）
    // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY))
    user: getItem(TOKEN_KEY),
    cachePages: ['LayoutIndex']
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 为了防止数据丢失 ， 我们需要将数据备份到本地存储
      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
      setItem(TOKEN_KEY, state.user)
    },
    addCachePage (state, page) {
      if (!state.cachePages.includes(page)) {
        state.cachePages.push(page)
      }
    },
    removeCachePage (state, page) {
      // 删除需要缓存的组件
      const idx = state.cachePages.indexOf(page)
      if (idx !== -1)state.cachePages.splice(page, 1)
    }
  },
  actions: {
  },
  modules: {
  }
})
