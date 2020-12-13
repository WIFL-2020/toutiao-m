<template>
  <div class="article-list">
    <!-- 下拉刷新 -->
    <!-- <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        :success-text="refreshSuccessText"
        :success-duration="1500"
        finished-text="没有更多了"
        @refresh="onRefresh"
      > -->
    <van-pull-refresh
    v-model="isRefreshLoading"
    @refresh="onRefresh"
    :success-duration="1500"
    :success-text="refreshSuccessText"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <van-cell v-for="(article, index) in list" :key="index" :title="article.title" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article.js'
export default {
  name: 'ArticleList',
  components: {},
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false, // 是否加载失败
      timestamp: null, // 请求下一页数据的时间戳
      isRefreshLoading: false,
      refreshSuccessText: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      try {
        // 请求获取数据
        const { data } = await getArticles({
          // 频道ID
          channel_id: this.channel.id,
          // 时间搓
          timestamp: this.timestamp || Date.now(),
          // 是否包含置顶
          with_top: 1
        })
        // 将请求结果存放在list中
        const { results } = data.data
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.loading = true
        }
      } catch (err) {
        // this.$stast('获取数据失败')
        // console.log('获取数据失败', err)
        console.log(err)
        this.loading = false // 关闭 loading 效果
        this.error = true // 开启错误提示
      }
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1)
      //   }

      //   // 加载状态结束
      //   this.loading = false

      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true
      //   }
      // }, 1000)
    },
    // 当触发下拉刷新的时候调用该函数
    async onRefresh () {
      try {
        // 1. 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道 id
          timestamp: Date.now(), // 下拉刷新每次都应该获取最新数据
          with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })
        // 模拟随机失败的情况
        if (Math.random() > 0.5) {
          JSON.parse('dsnajndjsa')
        }

        // 2. 将数据追加到列表的顶部
        const { results } = data.data
        this.list.unshift(...results)

        // 3. 关闭下拉刷新的 loading 状态
        this.isRefreshLoading = false

        // 提示成功
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (err) {
        console.log(err)
        this.isRefreshLoading = false // 关闭下拉刷新的 loading 状态
        this.$toast('刷新失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
