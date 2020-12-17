<template>
   <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/" class="search-from">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :search-text="searchText" />
    <!-- 联想建议 -->
    <search-suggestion v-else-if="searchText" :search-text="searchText" @search="onSearch"/>
     <!-- 搜索历史记录 -->
    <search-history v-else :search-histories="searchHistories"/>
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
export default {
  name: 'SearchIndex',
  data () {
    return {
      searchText: '',
      // 控制页面显示状态
      isResultShow: false,
      searchHistories: []
    }
  },
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  props: {},
  computed: {},
  watch: {},
  created () {},
  methods: {
    onSearch (val) {
      // console.log(val)
      // 更新文本内容
      this.searchText = val

      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
      // 渲染搜索结果
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    }
  }
}
</script>
<style lang="less" scoped>
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-from {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
