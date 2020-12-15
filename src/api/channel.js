// 获取频道列表模块

import request from '@/utils/request.js'

// 获取所有的频道列表
export const getAllChannel = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}
