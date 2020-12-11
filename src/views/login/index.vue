<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" />
    <!-- 输入框 -->
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field
        name="mobile"
        placeholder="请输入手机号码"
        :rules="userFormRules.mobile"
        v-model="user.mobile"
        type="number"
        maxlength="11"
      >
      <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        v-model="user.code"
        type="number"
        maxlength="6"
      >
      <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
       <template #button>
         <!-- tiem 倒计时的时间 -->
         <van-count-down
          :time="1000 * 10"
          format="ss s"
          v-if="isCountDownShow"
          @finish="isCountDownShow=false"
          />
          <van-button
          v-else
          @click="onSendSms"
          native-type="button"
          class="send-sms-btn"
          round
          size="small"
          type="default"
          >发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        // 手机号码
        mobile: '',
        // 验证码
        code: ''
      },
      // 表单验证
      userFormRules: {
        mobile: [
          { required: true, message: '手机号码不能为空' },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '手机号码格式错误' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isCountDownShow: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onSubmit (values) {
      const user = this.user

      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间，默认 2000，0 表示持续展示不关闭
      })
      // try 测试代码块的错误。
      try {
        const { data } = await login(user)
        // console.log('登录成功', res)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号码或验证码错误')
          // console.log('登录失败')
        } else {
          // fail 错误
          this.$toast.fail('登录失败，请稍后重试')
          // console.log('登录失败，请稍后重试')
        }
      }
    },
    async onSendSms () {
      // 1.校验手机号
      console.log('触发了点击事件')
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      console.log(123)
      // 2.验证通过，显示倒计时
      this.isCountDownShow = true
      // 3.请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        //   发送失败关闭倒计时
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
