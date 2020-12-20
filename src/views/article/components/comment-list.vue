<template>
  <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
  :error.sync="error"
  error-text="请求失败，点击重新加载"
>
  <van-cell v-for="(item, index) in list" :key="index" :title="item.content" />
</van-list>
</template>

<script>
import { getComments } from '@/api/comment'
export default {
  name: 'Comment-List',
  components: {},
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      error: false
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
        const { data } = await getComments({
          type: 'a',
          source: this.source,
          offset: this.offset,
          limit: 10
        })
        // 将数据添加到列表中
        const { results } = data.data
        this.list.push(...results)

        this.loading = false
        // 将loading 设置为 false
        if (results.length) {
          // 有就更新获取下一页的数据页码
          this.offset = data.data.last_id
        }
        // 没有就设置 finished结束
        this.finished = true
        console.log(data)
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
