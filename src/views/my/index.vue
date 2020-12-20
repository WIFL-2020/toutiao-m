<template>
  <div class="my-container">
     <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <!-- <van-image class="avatar" round  src="https://up.keaitupian.com/pic_360/a9/e3/73/a9e3733c77c87557c669e40aabd5596f.jpg"  fit="cover"/> -->
          <van-image class="avatar" round  :src="userInfo.photo"  fit="cover"/>
          <!-- <span class="name">黑马头号黑粉</span> -->
          <span class="name">{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <div v-else class="header not-login">
      <!-- <div class="login-btn" @click="$router.push('/login')"> -->
      <div class="login-btn" @click="$router.push({
        name: 'login',
        query: {
          redirect: '/'
        }
      })">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="">
        <span class="text">登录 / 注册</span>
      </div>
    </div>

    <!-- 导航宫格 -->
      <van-grid class="nav-grid" :column-num="2" clickable >
        <van-grid-item text="收藏">
          <i slot="icon" class="toutiao toutiao-shoucang"></i>
          <span class="text" slot="text">收藏</span>
        </van-grid-item>
        <van-grid-item text="文字">
          <i slot="icon" class="toutiao toutiao-lishi"></i>
          <!-- 不显示图标需要用到剧名插条 slot -->
          <span class="text" slot="text">历史</span>
        </van-grid-item>
      </van-grid>

      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
      <van-cell @click="onLogout" v-if="user" clickable class="logout-cell" title="退出登录" center/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data () {
    return {
      userInfo: {} // 用户信息
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    // 初始化的时候，如果用户登录了，我才请求获取当前登录用户的信息
    if (this.user) {
      this.loadUserInfo()
    }
  },
  mounted () {},
  methods: {
    onLogout () {
      // 退出提示
      // 在组件中需要使用 this.$dialog 来调用弹框组件
      this.$dialog.confirm({
        title: '确认退出吗？'
      }).then(() => {
        // on confirm
        // 确认退出：清除登录状态（容器中的 user + 本地存储中的 user）
        this.$store.commit('setUser', null)
      }).catch(() => {
        // on cancel
        console.log('取消执行这里')
      })
    },
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
      } catch (err) {
        console.log(err)
        this.$toast('获取数据失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
  .header {
    height: 361px;
    background: url("~@/assets/banner.png");
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        height: 132px;
        width: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
          .avatar {
            width: 132px;
            height: 132px;
            margin-right: 23px;
            border: 4px solid #fff;
          }
          .name {
            font-size: 30px;
            color: #fff;
          }
        }
    }
    .data-stats {
      // height: 130px;
      display: flex;
      // background-color: #ccc;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        // font-size: 40px;
        flex-direction: column;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  .nav-grid {
    background: #fff;
    .toutiao {
      font-size: 45px;
    }
    .toutiao-shoucang {
      color: #EB5253;
    }
    .toutiao-lishi {
      color: #FF9D1D;
    }
    .text {
      color: #000;
      margin-top: 8px;
      font-size: 28px;
    }
  }
  .logout-cell {
    height: 100px;
    text-align: center;
    color: #EB5253;
    margin: 10px 0;
    font-size: 30px;
  }
}
</style>
