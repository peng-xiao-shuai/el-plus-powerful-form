/*
 * @Author: peng-xiao-shuai
 * @Date: 2023-11-21 19:06:08
 * @LastEditors: peng-xiao-shuai
 * @LastEditTime: 2023-12-05 18:23:40
 * @Description:
 */
import { ElInput } from 'element-plus'
import type { SetDataType } from '~/index'
import { FormTypeEnum, clearSymbol } from '~/index'
import {
  componentProps,
  isProperty,
  useEvent,
} from '~/powerful-form/src/form-view-data'
export const FInput = defineComponent({
  name: 'FInput',
  props: componentProps(),
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const data = computed(
      () => props.formItem.data as SetDataType<FormTypeEnum.Input>
    )

    const { event } = useEvent<FormTypeEnum.Input>({
      formData: props.formData,
      index: props.index!,
      formItem: props.formItem,
    })

    /**
     * 不要直接使用 v-model props.formData[props.formItem.prop!] 避免页面卡顿
     */
    const modelValue = ref(props.formData[props.formItem.prop!])
    const stop = watchEffect(() => {
      modelValue.value = props.formData[props.formItem.prop!]
    })

    onUnmounted(() => {
      stop()
    })

    return () => (
      <>
        <ElInput
          v-slots={{
            [data.value?.slot as string]: () => (
              <span style={{ padding: '0 10px' }}>{data.value?.symbol}</span>
            ),
          }}
          style={data.value?.style || {}}
          placeholder={`请输入${clearSymbol(props.formItem.text)}`}
          v-model={modelValue.value}
          onBlur={(...arg: any) => event('blur', ...arg)}
          onFocus={(...arg: any) => event('focus', ...arg)}
          onChange={(v: string) => {
            emit('update:modelValue', v)
            event('change', v)
          }}
          onInput={(...arg: any) => event('input', ...arg)}
          onClear={(...arg: any) => event('clear', ...arg)}
          {...{
            rows: 3,
            clearable: true,
            type: props.formItem.type || FormTypeEnum.Input,
            ...isProperty(
              {
                formData: props.formData,
                index: props.index!,
                formItem: props.formItem,
              },
              data.value?.property
            ),
          }}
        ></ElInput>
      </>
    )
  },
})

export default FInput
