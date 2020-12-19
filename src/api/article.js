// 文章请求接口
import request from '@/utils/request'
// 获取文章数据
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/v1_1/articles',
    params
  })
}

// 获取文章接口
export const getArticleById = articleId => {
  return request({
    method: 'GET',
    url: `/v1_0/articles/${articleId}`
  })
}
