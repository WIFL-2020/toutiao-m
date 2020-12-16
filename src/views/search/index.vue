<template>
   <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResult = false"
      />
    </form>
     <!-- 搜索历史 -->
    <search-history v-if="isResult"/>
    <!-- 联想建议 -->
    <search-suggestion v-else-if="searchText" :search-text="searchText"/>
    <!-- 搜索结果 -->
    <search-result v-else/>
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
      isResult: false
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
      this.isResult = true
    },
    onCancel () {
      this.$router.back()
    }
  }
}
</script>
.search-container {
  .van-search__action {
    color: #fff;
  }
}
<style scoped></style>
