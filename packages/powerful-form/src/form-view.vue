<!--
 * @Author: peng-xiao-shuai
 * @Date: 2023-11-21 10:47:21
 * @LastEditors: peng-xiao-shuai
 * @LastEditTime: 2023-12-25 14:56:55
 * @Description:
-->
<template>
  <ElForm
    v-bind="property"
    ref="elFormRef"
    :model="formData"
    :rules="props.showType === 'query' ? {} : rules"
    :disabled="disabled"
    :style="
      property?.inline
        ? {}
        : {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }
    "
  >
    <ElFormItem
      v-for="(item, index) in formRenderItems"
      :key="item.prop"
      :prop="item.prop"
      :label="showLabel ? clearSymbol(item.text) : ''"
      :style="{
        flexBasis: item?.basis || '100%',
      }"
    >
      <!-- 插槽 -->
      <slot
        v-if="item.type == 'slot'"
        :name="item.slotName || 'default'"
        :index="index"
      />

      <FRenderJsx
        v-else-if="typeof item.render == 'function'"
        v-bind="bindAttr(item, formData, index)"
      />
      <component
        :is="matchComponents(item.type || FormTypeEnum.Input)"
        v-bind="bindAttr(item, formData, index)"
        v-else
        @update:model-value="formData[item.prop!] = $event"
      />
    </ElFormItem>
  </ElForm>
</template>

<script setup lang="ts">
import {
  FormTypeEnum,
  formViewProps,
  useFormViewState,
  useFunction,
} from './form-view-data'
import { clearSymbol, componentRegister, matchComponents } from '~/index'

const { appContext } = getCurrentInstance()!
componentRegister(appContext.app)

const props = defineProps(formViewProps)

const { formViewData, formRenderItems, elFormRef, transformHeader } =
  useFormViewState(props)
const { formData, rules } = toRefs(formViewData)

const { bindAttr, submitForm, resetForm, refreshRender } = useFunction(
  props,
  formData,
  elFormRef,
  transformHeader
)

defineExpose({
  $slots: useSlots(),
  $attrs: useAttrs(),
  $refs: {
    elFormRef,
  },
  props,
  powerfulFormData: formViewData,
  formItems: formRenderItems.value,
  submitForm,
  resetForm,
  refreshRender,
})
</script>

<style scoped>
.el-form--inline .el-form-item {
  margin-right: 10px;
}
</style>
