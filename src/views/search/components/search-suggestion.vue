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
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, highlightStr)
    }
  }
}
</script>

<style lang="less" scoped>
.search-suggestion {
  /deep/.active {
    color: red;
  }
}
</style>
