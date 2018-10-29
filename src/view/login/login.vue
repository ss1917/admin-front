<style lang="less">
@import "./login.less";
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录xxx系统" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">可以使用邮箱登录，第一次登录可以不输入动态码</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  data () {
    return {}
  },

  methods: {
    ...mapActions([
      'handleLogin'
      // 'getUserInfo'
    ]),
    handleSubmit ({ username, password, dynamic }) {
      const nextUrl = this.$route.query.next_url ? this.$route.query.next_url : ''
      this.handleLogin({ username, password, dynamic, nextUrl }).then(res => {
        if (res.code === 0) {
          this.$Message.success(`${res.msg}`)
          this.$router.push({
            name: this.$config.homeName
          })
        } else if (res.code === -3) {
          this.$Message.error({
            content: `${res.msg}`,
            duration: 5,
            closable: true
          })
          // 邮箱认证通过，请根据邮箱完善用户信息
          this.$router.push({ name: 'home' })
        } else if (res.code === -6) {
          this.$Message.error({
            content: `${res.msg}`,
            duration: 5,
            closable: true
          })
          // 跳转添加MFA认证
          this.$router.push({ name: 'mfa' })
        } else {
          this.$Message.error({
            content: `${res.msg}`,
            duration: 5,
            closable: true
          })
        }
        // this.getUserInfo().then(res => {
        //   this.$router.push({
        //     name: 'home'
        //   })
        // })
      })
    }
  }
}
</script>

<style>
</style>
