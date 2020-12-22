// 请求模块

import axios from 'axios'
import store from '@/store'
import jsonBig from 'json-bigint'
import { Toast } from 'vant'
import router from '@/router'
const request = axios.create({
  // baseURL: 'http://ttapi.research.itcast.cn/'// 接口的基准路径
  baseURL: 'http://toutiao-app.itheima.net/',
  transformResponse: [function (data) {
    try {
      // 如果转换成功则返回转换的数据结果
      // data 后端返回的数据
      return jsonBig.parse(data)
    } catch (err) {
      // 如果转换失败，则包装为统一数据格式并返回
      return data
    }
  }]
})
const requestToken = axios.create()
export default request

// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  console.log(config)
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.request.use(function (response) {
  // Do something before request is sent
  return response
}, async function (error) {
  const status = error.response.status
  if (status === 400) {
    Toast.fail('客户端请求参数错误')
  } else if (status === 401) {
    // 无效的token
    const { user } = store.state
    if (!user || !user.refresh_token) {
      // 直接去登录吧，没办法了，跳转到登录页面
      // this.$router.push => 组件里面可以这样条
      // router.push('/login')
      // 登录路由其实没有必要，不期望保留历史记录
      return router.replace('./login')
    }
    // 用 refresh_token 获取新的 token
    // 直接用现有的 request 去请求，假如请求的结果还是 401，会形成死循环
    // request({})
    try {
      const { data } = await requestToken({
        method: 'PUT',
        url: '/app//v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      user.token = data.data.token
      // 用新的 token 更新 store 里面的无效的 token
      store.comment('setUser', user)
      // 把之前的错误请求重新完整的再发一次
      // 这里发送请求，带过去的 token 确实是无效的 token，但是没关系，因为这个请求会经过自己的请求拦截器
      // 自己请求拦截器里面会有重新获取 token 的操作
      return request(error.config)
    } catch (err) {
      // 用 refresh_token 换取 token 的时候也出错了
      return router.replace('/login')
    }
    // Toast.fail('无效的token')
  } else if (status === 403) {
    Toast.fail('客户端没有权限')
  } else if (status === 404) {
    Toast.fail('请求资源不存在')
  } else if (status === 405) {
    Toast.fail('请求方法不支持')
  } else if (status >= 500) {
    Toast.fail('服务器抽风了')
  }
  // 错误错误
  return Promise.reject(error)
})
