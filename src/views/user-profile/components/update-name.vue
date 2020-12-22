<template>
  <div class="updata-name">
    <van-nav-bar
      title="昵称"
      left-text="返回"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />

    <div class="field-wrap">
      <van-field
        v-model.trim="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入留言"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdataName',
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      localName: this.value
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        // 禁止背景点击
        forbidClick: true,
        // 持续展开
        duration: 0
      })
      try {
        const localName = this.localName
        if (!localName.length) {
          this.$toast('文本不能为空')
          return
        }
        await updateUserProfile({
          name: localName
        })

        // 更新视图
        this.$emit('input', localName)

        // 关闭弹窗
        this.$emit('close')

        // 提示成功
        this.$toast.success('修改数据成功')
      } catch (err) {
        this.$toast.fail('获取信息失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.updata-name {
  .field-wrap {
    padding: 20px;
  }
}
</style>
