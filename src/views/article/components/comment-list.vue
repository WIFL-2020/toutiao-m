/* eslint-disable indent */
<template>
  <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
  :error.sync="error"
  error-text="请求失败，点击重新加载"
>
  <comment-item
    v-for="(item, index) in list"
    :key="index"
    :comment="item"
  />
</van-list>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item'
export default {
  name: 'Comment-List',
  components: {
    CommentItem
  },
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
      limit: 20,
      error: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.onLoad()
  },
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

        this.$emit('onload-success', data.data)

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
