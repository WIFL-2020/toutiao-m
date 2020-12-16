<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
      type="danger"
      plain
      round
      size="mini"
      class="edit-btn"
      @click="isEdit = !isEdit"
      >{{isEdit ? '完成':'编辑'}}</van-button>
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
      class="grid-item"
      v-for="(channelItem, index) in myChannels"
      :key="index"
      @click="onMyChannelClick(channelItem, index)"
      swipe-threshold
    >
    <van-icon v-show="isEdit && !fiexChannels.includes(channelItem.id)" slot="icon" name="clear"></van-icon>
    <!-- <van-icon v-show="isEdit && !isguding.includes(channelItem.id)" slot="icon" name="clear"></van-icon> -->
    <span class="text" :class="{ active: active===index }" slot="text">{{channelItem.name}}</span>
    </van-grid-item>
    </van-grid>
    <!-- 推荐频道 -->
    <van-cell :border="false">
      <div slot="title">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
      class="grid-item"
      v-for="(channel, index) in recommendChannels"
      :key="index"
      icon="plus"
      :text="channel.name"
      @click="onAddChannel(channel)"
    />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannel, addUserChannel, deleteUserChannel } from '@/api/channel.js'
import { setItem } from '@/utils/storage.js'
import { mapState } from 'vuex'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [],
      // 控制编辑按钮的显示
      isEdit: false,
      // 存放默认值的数组 不允许删除
      fiexChannels: [0]
    }
  },
  computed: {
    recommendChannels () {
      // 遍历数组，将符合条件的数据存储在新的数组中
      return this.allChannels.filter(channel => {
        // 返回条件，需要参与运算 ，，  find 遍历数组，将符合条件的第一个元素返回
        return !this.myChannels.find(myChannel => {
          // 不相同的挑出来
          return channel.id === myChannel.id
        })
      })
    },
    ...mapState(['user'])
  },
  watch: {},
  created () {
    this.loadAllChannels()
  },
  mounted () {},
  methods: {
    async loadAllChannels () {
      try {
        const { data } = await getAllChannel()
        this.allChannels = data.data.channels
        // console.log(data)
      } catch (err) {
        this.$toast('获取频幕数据失败')
      }
    },
    async onAddChannel (channel) {
      this.myChannels.push(channel)
      if (this.user) {
        try {
          await addUserChannel({
            id: channel.id,
            seq: this.myChannels.length
          })
          this.$toast('添加成功')
        } catch (err) {
          this.$toast('保存失败')
        }
      } else {
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
    onMyChannelClick (channelItem, index) {
      if (this.isEdit) {
        // 如果是固定则不删除
        if (this.fiexChannels.includes(channelItem.id)) {
          return
        }
        // 删除频道管道
        this.myChannels.splice(index, 1)
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1, true)
        }
        // 处理持续化
        this.deleteChannel(channelItem)
      } else {
        this.$emit('update-active', index, false)
      }
    },
    // 删除频道
    async deleteChannel (channelItem) {
      try {
        if (this.user) {
          // 已登录，将数据存储到线上
          await deleteUserChannel(channelItem.id)
        } else {
          // 未登录，将数据存储到本地
          setItem('channles', this.userChannels)
        }
      } catch (err) {
        console.log(err)
        this.$toast('删除频道失败，请稍后重试')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
   padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/.grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text, .text{
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
    }
  }
  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
      .active {
          color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
      // .van-grid-item__icon-wrapper {
      //   position: unset;
      // }
    }
  }
  /deep/.recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
