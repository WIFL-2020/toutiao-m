<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar :title="`${comment.reply_count}条回复`">
      <van-icon
        slot="left"
        name="cross"
        @click="$emit('close')"
      />
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="scroll-wrap">
       <!-- 当前评论项 -->
      <comment-item
        :comment="comment"
      />
      <!-- /当前评论项 -->

      <van-cell title="所有回复" />

      <!-- 评论的回复列表 -->
      <comment-list
        :list="commentList"
        :source="comment.com_id"
        type="c"
      />
      <!-- /评论的回复列表 -->
    </div>
      <!-- 评论的发布框 -->

    <div class="post-wrap">
      <van-button @click="isPostShow=true" class="post-btn" size="small" round>写评论</van-button>
    </div>

    <!-- 发布评论 -->
    <van-popup v-model="isPostShow" position="bottom">
      <comment-post
      :target="comment.com_id"
      @post-success="onPostSuccess"
      />
    </van-popup>
    <!-- 底部 -->
    <!-- /底部 -->
  </div>
</template>

<script>
import CommentItem from './comment-item.vue'
import CommentList from './comment-list.vue'
import CommentPost from './comment-post'

export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    CommentList,
    CommentPost
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isPostShow: false,
      commentList: []
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onPostSuccess (data) {
      // 关闭弹窗
      this.isPostShow = false
      // 更新数据
      this.comment.reply_count++
      //
      this.commentList.unshift(data.new_obj)
      console.log(data)
    }
  }
}
</script>

<style scoped lang="less">
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}
.post-wrap {
  position: fixed;
  bottom:0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .post-btn {
    width: 60%;
  }
}
</style>
