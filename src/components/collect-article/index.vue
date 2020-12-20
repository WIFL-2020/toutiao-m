<template>
    <van-icon
      :name="value ? 'star' : 'star-o'"
      :class="{
        collected: value
        }"
      :loading="loading"
      @click="onCollect"
    />
</template>

<script>
import { addCollect, deleteCollect } from '@/api/article'
export default {
  name: 'CollectArticle',
  components: {},
  props: {
    value: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.onCollect()
  },
  mounted () {},
  methods: {
    async onCollect () {
      this.loading = true
      try {
        if (this.value) {
          await deleteCollect(this.articleId)
        } else {
          await addCollect(this.articleId)
        }
        // 更新视图
        this.$emit('input', !this.value)
        //  用于判断是收藏成功与取消收藏
        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
      } catch (err) {
        console.log(err)
        this.$toast.fail('获取数据失败,请重试')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
 .van-icon {
    color: #ffa500;
  }
</style>
