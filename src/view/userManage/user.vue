<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" @on-delete="handleDelete" Your Profile>
        <div slot="new_btn" class="search-con search-col">
          <Button type="info" class="search-btn"  @click="showModal">新建用户</Button>
        </div>
      </tables>
      <br/>
      <div style="margin: 0px;overflow: hidden">
        <div style="float: left;">
            <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" show-sizer @on-change="changePage" @on-page-size-change="handlePageSize"></Page>
        </div>
    </div>
    </Card>
      <Modal  v-model="modalMap.modalVisible"  :title="modalMap.modalTitle" :loading=true :footer-hide=true>
        <form-group :list="formList"  @on-submit-success="handleSubmit"></form-group>
      </Modal>
  </div>
</template>

<script>
import Tables from '_c/tables'
import FormGroup from '_c/form-group'
import { getuserlist, newuser, deluser } from '@/api/user'
export default {
  // name: 'users',
  components: {
    Tables,
    FormGroup
  },
  data () {
    return {
      // 弹出框
      modalMap: {
        modalVisible: false,
        modalTitle: '创建用户'
      },
      // 渲染form数据
      formList: [
        {
          name: 'username',
          type: 'i-input',
          value: 'woshiceshi',
          label: '账户名称',
          rule: [
            { required: true, message: '账户名称不能为空', trigger: 'blur' }
          ]
        },
        {
          name: 'nickname',
          type: 'i-input',
          value: 'woshiceshi',
          label: '用户姓名',
          rule: [
            { required: true, message: '用户姓名不能为空', trigger: 'blur' }
          ]
        },
        {
          name: 'department',
          type: 'i-input',
          value: 'woshiceshi',
          label: '部门',
          rule: [{ required: true, message: '部门不能为空', trigger: 'blur' }]
        },
        {
          name: 'wechat',
          type: 'i-input',
          value: 'woshiceshi',
          label: '微信号码',
          rule: [
            { required: true, message: '微信号码不能为空', trigger: 'blur' }
          ]
        },
        {
          name: 'tel',
          type: 'i-input',
          value: '11111111111',
          label: '手机号码',
          rule: [
            { required: true, message: '手机号不能为空', trigger: 'blur' },
            {
              type: 'string',
              min: 11,
              max: 11,
              message: '必须为手机号码',
              trigger: 'blur'
            }
          ]
        },
        {
          name: 'no',
          type: 'i-input',
          value: 'woshiceshi',
          label: '工号',
          rule: [{ required: true, message: '工号不能为空', trigger: 'blur' }]
        },
        {
          name: 'email',
          type: 'i-input',
          value: 'woshiceshi@qq.com',
          label: '邮箱',
          rule: [
            { required: true, message: '邮箱不能为空', trigger: 'blur' },
            {
              type: 'email',
              message: '必须为邮箱格式',
              trigger: 'blur'
            }
          ]
        }
      ],
      columns: [
        // {type: 'selection', title: '',  key: '', width: 60,align: 'center'},
        { title: '用户名', key: 'username', sortable: true },
        { title: '昵称', key: 'nickname', sortable: true },
        { title: '部门', key: 'department', editable: true },
        { title: '手机', key: 'tel', editable: true },
        { title: '微信', key: 'wechat', editable: true },
        { title: '工号', key: 'no', editable: true },
        { title: '邮箱', key: 'email', editable: true },
        { title: '登录IP', key: 'last_ip', editable: true },
        { title: '最后登录', key: 'last_login', sortable: true },
        {
          title: '操作',
          align: 'center',
          key: 'handle',
          options: ['delete'],
          button: [
            (h, params, vm) => {
              return h(
                'Poptip',
                {
                  props: {
                    confirm: true,
                    title: '你确定要删除吗?'
                  },
                  on: {
                    'on-ok': () => {
                      vm.$emit('on-delete', params)
                      vm.$emit('input',
                        params.tableData.filter(
                          (item, index) => index !== params.row.initRowIndex
                        )
                      )
                    }
                  }
                },
                [
                  // h('Button', '自定义删除')
                ]
              )
            }
          ]
        }
      ],
      // 分页数据
      tableData: [],
      pageTotal: 0, // 数据总数
      pageNum: 1, // 当前页码
      pageSize: 10 // 每页条数
    }
  },
  methods: {
    handleDelete (params) {
      console.log(params.row.user_id)
      deluser({user_id: params.row.user_id}).then(res => {
        if (res.data.code === 0) {
          this.$Message.success(`${res.data.msg}`)
          this.pageTotal = res.data.count
          this.tableData = res.data.data
        } else {
          this.$Message.error(`${res.data.msg}`)
        }
      }).catch(err => {
        this.$Message.error(err)
      })
    },
    changePage (value) {
      this.pageNum = value
      this.getUserList(this.pageNum, this.pageSize)
    },
    // 每页条数
    handlePageSize (value) {
      this.pageSize = value
      this.getUserList(1, this.pageSize)
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`
      })
    },
    // 获取用户列表
    getUserList (page, limit) {
      getuserlist(page, limit).then(res => {
        if (res.data.code === 0) {
          this.$Message.success(`${res.data.msg}`)
          this.pageTotal = res.data.count
          this.tableData = res.data.data
        } else {
          this.$Message.error(`${res.data.msg}`)
        }
      })
    },
    handleSubmit (value) {
      setTimeout(() => {
        newuser(value.data)
          .then(res => {
            const data = res.data
            if (res.data.code === 0) {
              this.$Message.info(`${data.msg}`)
              // 重新获取数据
              this.getUserList(this.pageNum, this.pageSize)
            } else {
              this.$Message.error(`${data.msg}`)
            }
          })
          .catch(err => {
            this.$Message.error(err)
          })
        this.modalMap.modalVisible = false
      }, 2000)
    },
    // 弹出对话框
    showModal () {
      this.modalMap.modalVisible = true
    }
    // 确定对话框
    // ok() {
    //   setTimeout(() => {
    //     this.$Message.info("Clicked ok");
    //     this.modalMap.modalVisible = false;
    //   }, 2000);
    // },
    // // 取消对话框
    // cancel() {
    //   this.$Message.info("Clicked cancel");
    // }
  },
  mounted () {
    this.getUserList(this.pageNum, this.pageSize)
  }
}
</script>

<style lang="less" scoped>
.search-con {
  padding: 10px 0;
  .search {
    &-col {
      display: inline-block;
      width: 200px;
    }
    &-input {
      display: inline-block;
      width: 200px;
      margin-left: 2px;
    }
    &-btn {
      margin-left: 2px;
    }
  }
}
</style>
