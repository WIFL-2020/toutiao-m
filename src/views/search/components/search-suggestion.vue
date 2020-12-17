<template>
  <div class="search-suggestion">
    <!-- <van-cell title="黑马程序员" icon="search"></van-cell>
    <van-cell title="黑马程序员" icon="search"></van-cell>
    <van-cell title="黑马程序员" icon="search"></van-cell>
    <van-cell title="黑马程序员" icon="search"></van-cell> -->
    <van-cell
    icon="search"
    v-for="(text, index) in suggestions"
    :key="index"
    @click="$emit('search', text)"
    >
    <div slot="title" v-html="highlight(text)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  data () {
    return {
      // 联想建议数据列表
      suggestions: []
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  computed: {},
  watch: {
    searchText: {
      // handler (value) {
      //   // console.log(value)
      //   this.loadSearchSuggestions(value)
      // },
      handler: debounce(function (value) {
        this.loadSearchSuggestions(value)
      }, 1000),
      immediate: true
    }
  },
  methods: {
    async loadSearchSuggestions (q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.suggestions = data.data.options
        console.log(data)
      } catch (err) {
        this.$toast('获取数据失败')
      }
    },
    highlight (text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`
      // 正则表达式 // 中间的内容都会当作匹配字符串来使用， 而不是数据变量
      // 如果需要根据数据变量动态的创建正则表达式， 则手动的new RegExp
      //  RegExp 正则表达式构建函数
      //  参数一： 匹配模式字符串，他会根据这个字符串创建正则对象
      //  参数二： 匹配模式，需要写在字符串中
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, highlightStr)
    }
  }
}
</script>

<style lang="less" scoped>
.search-suggestion {
  /deep/ span.active {
    color: red;
  }
}
</style>
