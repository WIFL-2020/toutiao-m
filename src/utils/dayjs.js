import dayjs from 'dayjs'
import Vue from 'vue'

// 加载中文语言包
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用相对时间的插件
dayjs.extend(relativeTime)

// 全局加载配置
dayjs.locale('zh-cn')

// 定义全局过滤器
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})

// 打印时间 ------测试
// console.log(dayjs().format('YYYY-MM-DD'))
