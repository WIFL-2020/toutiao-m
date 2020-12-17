<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="加载失败，请点击重试"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20,
      error: false
    }
  },
  methods: {
    async onLoad () {
      try {
        // 1.请求获取数据
        const { data } = await getSearchResult({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText
        })
        console.log(data.data)
        // 2.将数据添加到数组列表中
        const { results } = data.data
        this.list.push(...results)
        // 3.将本地加载的loading 关闭
        this.loading = false

        // 4.判断是否还有数据
        if (results.length) {
          // 有就更新页码
          this.page++
        } else {
          // 没有就停止加载数据
          this.finished = true
        }
        console.log(data)
      } catch (err) {
        // 添加失败提示消息
        this.error = true
        // 加载失败，需要停止加载
        this.loading = false
        this.$toast('获取数据失败')
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
