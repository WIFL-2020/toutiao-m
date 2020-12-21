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
    @click-reply="$emit('click-reply', $event)"
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
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      validator (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      error: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loading = true
    this.onLoad()
  },
  mounted () {},
  methods: {
    async onLoad () {
      try {
        // 请求获取数据
        const { data } = await getComments({
          type: this.type,
          source: this.source.toString(),
          offset: this.offset,
          limit: this.limit
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
        // this.$toast.fail('加载失败，点击重试')
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
