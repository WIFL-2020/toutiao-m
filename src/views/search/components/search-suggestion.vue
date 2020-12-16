<template>
  <div class="search-suggestion">
    <van-cell title="黑马程序员" icon="search"></van-cell>
    <van-cell title="黑马程序员" icon="search"></van-cell>
    <van-cell title="黑马程序员" icon="search"></van-cell>
    <van-cell title="黑马程序员" icon="search"></van-cell>
    <van-cell :title="text" icon="search" v-for="(text, index) in suggestions" :key="index"></van-cell>
  </div>
</template>

<script>
// import { getSearchSuggestions } from '@/api/search'
export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    searchText: {
      handler (value) {
        console.log(value)
      },
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
</style>
