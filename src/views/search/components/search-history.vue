<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('clear-search-histories', [])">全部删除</span>
        &nbsp;
        <span v-if="isDeleteShow=false">完成</span>
      </div>
      <van-icon name="delete" @click="isDeleteShow=true"></van-icon>
    </van-cell>
    <van-cell :title="item" v-for="(item, index) in searchHistories" :key="index" @click="onSearchItemClick(item, index)">
      <van-icon v-show="isDeleteShow" name="close"/>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  data () {
    return {
      // 控制删除显示状态
      isDeleteShow: false
    }
  },
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  methods: {
    onSearchItemClick (item, index) {
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1)
      } else {
        this.$emit('search', index)
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
