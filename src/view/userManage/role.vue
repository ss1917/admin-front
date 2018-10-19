<template>
<div>
<Card>
  <div class="split-pane-page-wrapper">
    <split-pane v-model="offset" @on-moving="handleMoving">
      <div slot="left" class="pane left-pane">
        <Row>
          <Col span="23">
        <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" @on-delete="handleDelete" @on-save-edit="handleInput">
        <div slot="new_btn" class="search-con search-col">
          <Button type="info" class="search-btn"  @click="showModal">新建</Button>
        </div>
      </tables>
      </Col>
      </Row>
      <br/>
      <div style="margin: 0px;overflow: hidden">
        <div style="float: left;">
            <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" show-sizer show-total @on-change="changePage" @on-page-size-change="handlePageSize"></Page>
        </div>
    </div>
      </div>
      <div slot="right" class="pane right-pane"></div>
    </split-pane>
  </div>
  </Card>
  <Modal  v-model="modalMap.modalVisible"  :title="modalMap.modalTitle" :loading=true :footer-hide=true>
    <form-group :list="formList"  @on-submit-success="handleSubmit"></form-group>
  </Modal>
  </div>
</template>

<script>
import SplitPane from '_c/split-pane'
import Icons from '_c/icons'
import Tables from '_c/tables'
import FormGroup from '_c/form-group'
import { getrolelist } from '@/api/user'
export default {
  components: {
    SplitPane,
    Icons,
    Tables,
    FormGroup
  },
  data () {
    return {
      offset: 0.6,
      offsetVertical: '250px',
      // 弹出框
      modalMap: {
        modalVisible: false,
        modalTitle: '创建用户'
      },
      // 分页数据
      tableData: [],
      pageTotal: 0, // 数据总数
      pageNum: 1, // 当前页码
      pageSize: 10, // 每页条数
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
        }
      ],
      columns: [
        { title: 'ID', key: 'role_id', width: 80, sortable: true },
        { title: '角色', key: 'role_name', width: 100, sortable: true },
        {
          title: '状态',
          key: 'status',
          width: 80,
          align: 'center',
          render: (h, params, vm) => {
            return h('div', [
              h('i-switch', {
                props: {
                  // type: "primary",
                  value: params.row.status === '0' // 控制开关的打开或关闭状态，官网文档属性是value
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  'on-change': () => {
                    this.onSwitch(params)
                  }
                }
              })
            ])
          }
        },
        {
          title: '操作',
          align: 'center',
          // 渲染按钮
          render: function (h, params) {
            return h('span', [
              // h(
              //   "Poptip",
              //   {
              //     props: {
              //       confirm: false
              //     },
              //     on: {
              //       "on-ok": () => {
              //         console.log("oooooo");
              //       }
              //     }
              //   },
              //   [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '10px'
                  },
                  on: {
                    click: () => {
                      console.log('xxxx')
                    }
                  }
                },
                '用户'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '10px'
                  },
                  on: {
                    click: () => {
                      console.log('xxxx')
                    }
                  }
                },
                '组件'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '10px'
                  },
                  on: {
                    click: () => {
                      console.log('xxxx')
                    }
                  }
                },
                '菜单'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '10px'
                  },
                  on: {
                    click: () => {
                      console.log('xxxx')
                    }
                  }
                },
                '权限'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '10px'
                  },
                  on: {
                    click: () => {
                      console.log('xxxx', this.handleDelete)
                      this.handleDelete(params)
                    }
                  }
                },
                '删除'
              )
            ])
            // ]);
          }
        }
      ]
    }
  },
  methods: {
    handleMoving (e) {
      console.log(e.atMin, e.atMax)
    },
    // 获取角色列表
    getRoleList (page, limit) {
      getrolelist(page, limit).then(res => {
        if (res.data.code === 0) {
          this.$Message.success(`${res.data.msg}`)
          this.pageTotal = res.data.count
          this.tableData = res.data.data
        } else {
          this.$Message.error(`${res.data.msg}`)
        }
      })
    },
    handleDelete (params) {
      // let r = confirm("Press a button!");
      console.log(params)
      // deluser({ user_id: params.row.user_id })
      //   .then(res => {
      //     if (res.data.code === 0) {
      //       this.$Message.success(`${res.data.msg}`);
      //       // this.pageTotal = res.data.count;
      //     } else {
      //       this.$Message.error(`${res.data.msg}`);
      //     }
      //   })
      //   .catch(err => {
      //     this.$Message.error(err);
      //   });
    },
    handleSubmit (value) {
      setTimeout(() => {}, 1000)
    },
    handleInput (editData) {
      // 行内编辑
      const EditData = {
        user_id: editData.row.user_id,
        key: editData.column.key,
        value: editData.value
      }
      updateuser(EditData).then(res => {
        if (res.data.code === 0) {
          this.$Message.success(`${res.data.msg}`)
        } else {
          this.$Message.error(`${res.data.msg}`)
        }
      })
    },
    // 弹出对话框
    showModal () {
      this.modalMap.modalVisible = true
    },
    changePage (value) {
      this.pageNum = value
      this.getRoleList(this.pageNum, this.pageSize)
    },
    // 每页条数
    handlePageSize (value) {
      this.pageSize = value
      this.getRoleList(1, this.pageSize)
    }
  },
  mounted () {
    this.getRoleList(this.pageNum, this.pageSize)
  }
}
</script>

<style lang="less">
.center-middle {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.split-pane-page-wrapper {
  height: 750px;
  .pane {
    width: 100%;
    height: 100%;
    // &.left-pane{
    //   // background: sandybrown;
    // }
    // &.right-pane{
    //   background: palevioletred;
    // }
    // &.top-pane{
    //   background: sandybrown;
    // }
    // &.bottom-pane{
    //   background: palevioletred;
    // }
  }
  .custom-trigger {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #000000;
    position: absolute;
    .center-middle;
    box-shadow: 0 0 6px 0 rgba(28, 36, 56, 0.4);
    i.trigger-icon {
      .center-middle;
    }
  }
}
</style>
