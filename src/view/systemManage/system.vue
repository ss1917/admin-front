<template>
<Card style="">
  <p slot="title">系统参数配置</p>
  <Tabs  @on-click="handleTabs">
    <TabPane v-for="(item, index) in tabs"
      :key="`${_uid}_${index}`"
      :label="item.label"
      :icon="item.icon"
      :name="item.name">
      <form-group :list="formList"  @on-submit-success="handleSubmit"></form-group>
    </TabPane>
  </Tabs>
</Card>
</template>

<script>
import FormGroup from '_c/form-group'
export default {
  components: {
    FormGroup
  },
  data () {
    return {
      tabs: [
        { label: '系统设置', icon: 'logo-tux', name: 'webSetting' },
        { label: '邮件设置', icon: 'ios-mail', name: 'emailSetting' },
        { label: '短信接口', icon: 'ios-notifications', name: 'smsSetting' },
        { label: 'LDAP设置', icon: 'ios-flag', name: 'LDAPSetting' },
        { label: '邮箱登录', icon: 'md-mail', name: 'emailLogin' },
        {
          label: '核心设置',
          icon: 'ios-settings-outline',
          name: 'centerSetting'
        }
      ],
      formList: []
    }
  },
  methods: {
    handleTabs (name) {
      switch (name) {
        case 'webSetting':
          this.formList = []
          break
        case 'emailSetting':
          this.formList = [
            {
              name: 'smtp_host',
              type: 'i-input',
              value: '',
              label: 'SMTP主机',
              rule: [
                { required: true, message: 'SMTP主机不能为空', trigger: 'blur' }
              ]
            },
            {
              name: 'smtp_user',
              type: 'i-input',
              value: '',
              label: 'SMTP账户',
              rule: [
                { required: true, message: 'SMTP账户不能为空', trigger: 'blur' }
              ]
            },
            {
              name: 'smtp_passwd',
              type: 'i-input',
              value: '',
              label: 'SMTP密码',
              rule: [
                { required: true, message: 'SMTP密码不能为空', trigger: 'blur' }
              ]
            },
            {
              name: 'smtp_port',
              type: 'i-input',
              value: '465',
              label: 'SMTP端口',
              rule: [
                { required: true, message: 'SMTP端口不能为空', trigger: 'blur' }
              ]
            }
          ]
          break
        case 'smsSetting':
          this.formList = [
            {
              name: 'SMS_ACCESS_KEY_ID',
              type: 'i-input',
              value: '',
              placeholder: 'Enter SMS_ACCESS_KEY_ID',
              label: 'xxxx',
              rule: [
                { required: true, message: 'SMTP端口不能为空', trigger: 'blur' }
              ]
            },
            {
              name: 'SMS_ACCESS_KEY_SECRET',
              type: 'i-input',
              value: '',
              placeholder: 'Enter SMS_ACCESS_KEY_SECRET',
              label: 'xxxx',
              rule: [
                { required: true, message: 'SMTP端口不能为空', trigger: 'blur' }
              ]
            }
          ]
          break
        case 'LDAPSetting':
          this.formList = []
          break
        case 'emailLogin':
          this.formList = []
          break
        case 'centerSetting':
          this.formList = []
          break
      }
    },
    handleSubmit (value) {
      setTimeout(() => {}, 1000)
    }
  },
  mounted () {
    this.handleTabs('webSetting')
  }
}
</script>

<style scoped>
</style>
