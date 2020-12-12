// 请求模块

import axios from 'axios'
import store from '@/store'

const request = axios.create({
  // baseURL: 'http://ttapi.research.itcast.cn/'// 接口的基准路径
  baseURL: 'http://toutiao-app.itheima.net/'
})

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
