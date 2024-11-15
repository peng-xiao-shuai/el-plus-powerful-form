<template>
  <div class="app-container">
    <a
      style="
        display: block;
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 20px;
      "
      href="https://peng-xiao-shuai.github.io/vite-vue-admin-docs/zh-CN/component/powerful-table-demo.html"
      >更多示例</a
    >
    <div style="margin-bottom: 20px; display: flex">
      <PowerfulForm
        ref="powerfulForm"
        extend-table="powerfulTable"
        :property="{
          inline: true,
        }"
      />

      <el-button
        type="primary"
        @click="
          powerfulTable?.resetList(powerfulForm?.formViewData.formData || {})
        "
      >
        查询
      </el-button>
      <el-button @click="powerfulForm?.resetForm">重置</el-button>
    </div>

    <PowerfulTable
      ref="powerfulTable"
      :is-select="true"
      :btn-config="btnConfigs"
      :select-data="selectData"
      :select-compare="selectCompare"
      :header="headers"
      :operate-data="operateData"
      :pagination-property="{
        pageSizes: [2, 5, 7],
      }"
      :list-request="{
        listApi,
        listQuery: listQuery,
        pageSizeKey: 'pageSize',
        pageNoKey: 'pageNum',
        responseKey: 'data.result',
        listsKey: 'rows',
        totalKey: 'total',
      }"
      :tree="{ props: { hasChildren: 'hasChildren', children: 'cd' } }"
      :property="{
        rowClassName: ({index}: any) => 'powerful-table-plus-row'
      }"
      @batch-operate="batchOperate"
      @btn-click="handlerBtnClick"
      @btn-plus-change="btnChange"
      @btn-plus-refresh="handleRefresh"
      @row-click="handleClick"
      @component-event="handleComponentEvent"
    >
      <!-- <template #btn-left>
        <div>
          <el-button>1</el-button>
          <el-button>2</el-button>
        </div>
      </template>
      <template #btn-right>
        <div class="111">
          <el-button>3</el-button>
          <el-button>4</el-button>
        </div>
      </template> -->
      <!-- <template #empty>
        <div>暂无车型数据</div>
      </template> -->
      <template #Link>
        <div>
          <el-input
            v-model="engineName"
            size="small"
            placeholder="输入发动机名称"
          />
        </div>
      </template>

      <template #date="{ row }">
        <div>
          {{ row.data }}
        </div>
      </template>
    </PowerfulTable>

    <el-drawer
      v-model="state.dialogVisible"
      :title="titleMap[state.dialogStatus]"
      width="450px"
    >
      <PowerfulForm
        ref="PFormOperate"
        :property="{ labelWidth: '70px', labelPosition: 'left' }"
        extend-table="powerfulTable"
        :disabled="state.dialogStatus === 'view'"
        :show-type="state.dialogStatus"
        :form-data-default="data.form"
        :apis="{
          update: updateAdmin,
          added: updateAdmin,
        }"
      />
      <template #footer>
        <div class="dialog-footer">
          <el-button
            v-if="state.dialogStatus !== 'view'"
            type="primary"
            :loading="false"
            @click="handleConfirm"
          >
            确认
          </el-button>
          <el-button @click="state.dialogVisible = false">关闭</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { deepClone } from 'el-plus-powerful-table-ts/es'
import { PowerfulForm } from '../packages/index'
import { btnConfig, header, lists } from './indexData'
import type { EmitEnum } from 'el-plus-powerful-table-ts/es/powerful-table/src/powerful-table-data'
import type { Lists } from './indexData'
import type { PowerfulFormExpose } from '../packages/index'
import type {
  Handlers,
  PowerfulTableExpose,
  PowerfulTableOperateData,
} from 'el-plus-powerful-table-ts'

// 所有页面选中数组
const selectData = ref([{ a: 1 }, { a: 3 }])
const selectCompare = reactive(['a', 'id'])
const headers = reactive(header)
const btnConfigs = reactive(btnConfig)
const powerfulTable = ref<PowerfulTableExpose | null>(null)
const powerfulForm = ref<PowerfulFormExpose | null>(null)

const operateData = reactive<PowerfulTableOperateData>({
  value: '',
  operates: [
    {
      label: '删除',
      value: 'remove',
    },
  ],
})
const listQuery = reactive({
  pageNum: 1,
  pageSize: 2,
})
const engineName = ref('')

const handleComponentEvent: Handlers<Lists>[EmitEnum.ComponentEvent] = (
  e,
  ...arg
) => {
  console.log(`接受到${e.componentName}组件返回的${e.eventType}事件`, e, arg)
}

const listApi = (formData: Record<string, any> = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      delete formData.pageNum
      delete formData.pageSize
      console.log(formData, 'formData')

      const rows = (
        Object.keys(formData).length === 0
          ? lists
          : lists.filter((item) => {
              return Object.keys(formData).every((key) => {
                if (!formData[key] && typeof formData[key] !== 'number')
                  return true
                return item[key] === formData[key]
              })
            })
      ).filter((item, index) => {
        return (
          index >= (listQuery.pageNum - 1) * listQuery.pageSize &&
          index < listQuery.pageNum * listQuery.pageSize
        )
      })

      console.log(rows, 'rows')

      resolve({
        data: {
          result: {
            rows,
            total: lists.length,
          },
          message: '成功',
          code: '200',
        },
      })
    })
  })
}

const batchOperate: Handlers<Lists>[EmitEnum.BatchOperate] = (e) => {
  ElMessage.success('批量操作，参数详情，查看控制台')
  console.log('批量操作', e, e.ids)
}
const handlerBtnClick: Handlers<Lists>[EmitEnum.BtnClick] = (e) => {
  ElMessage.success('按钮修改操作，参数详情，查看控制台')
  if (e.params.emit === 'update') {
    state.dialogVisible = true
    state.dialogStatus = 'update'
    data.form = deepClone(e.row)
  } else if (e.params.emit === 'view') {
    state.dialogVisible = true
    state.dialogStatus = 'view'
    data.form = deepClone(e.row)
  }
}
// 行点击事件, 类型参照 ELement-plus rowCLick 事件
const handleClick = (e: any) => {
  ElMessage.success('行点击事件，参数详情，查看控制台')
  console.log('行点击', e, e.index)
}
// 左侧按钮回调
const btnChange: Handlers<Lists>[EmitEnum.BtnPlusChange] = (e) => {
  if (e.effect === 'add') {
    ElMessage.success('新增操作，参数详情，查看控制台')
    state.dialogVisible = true
    state.dialogStatus = 'added'
    console.log('新增操作', e)
  } else if (e.effect === 'edit') {
    ElMessage.success('修改操作，参数详情，查看控制台')
    console.log('修改操作', e)
  } else if (e.effect === 'remove') {
    ElMessage.success('批量删除操作，参数详情，查看控制台')
    console.log('批量删除操作', e)
  }
}

const handleRefresh: Handlers<Lists>[EmitEnum.BtnPlusRefresh] = () => {
  ElMessage.success('触发刷新')
}

// 修改逻辑
const PFormOperate = ref<PowerfulFormExpose | null>(null)

const titleMap = ref<Record<string, string>>({
  added: '创建',
  update: '编辑',
  view: '查看',
})
const state = reactive({
  dialogStatus: 'added',
  dialogVisible: false,
})
const data = reactive({
  form: {
    id: '',
    userId: '',
    loginName: '',
    userName: '',
    loginPwd: '',
    checkPwd: '',
    roleId: 0,
  },
})
const updateAdmin = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({})
    }, 200)
  })
}
const handleConfirm = () => {
  PFormOperate.value?.submitForm()

  state.dialogVisible = false
}
</script>

<style>
@import url('https://at.alicdn.com/t/c/font_2351447_xw9ezbg0kb.css');
</style>
