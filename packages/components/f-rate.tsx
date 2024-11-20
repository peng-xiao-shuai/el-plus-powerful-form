/*
 * @Author: peng-xiao-shuai
 * @Date: 2023-11-12 22:41:45
 * @LastEditors: peng-xiao-shuai
 * @LastEditTime: 2023-12-05 18:25:00
 * @Description:
 */
import { ElRate } from 'element-plus'
import type { FormTypeEnum, SetDataType } from '~/index'
import {
  componentProps,
  isProperty,
  useEvent,
} from '~/powerful-form/src/form-view-data'

export const FRate = defineComponent({
  name: 'FRate',
  props: componentProps(),
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const data = computed(
      () => props.formItem.data as SetDataType<FormTypeEnum.Rate>
    )

    const { event } = useEvent<FormTypeEnum.Rate>({
      formData: props.formData,
      index: props.index!,
      formItem: props.formItem,
    })

    return () => (
      <>
        <ElRate
          v-model={props.formData[props.formItem.prop!]}
          style={data.value?.style || {}}
          allow-half
          onChange={(arg: number) => {
            emit('update:modelValue', arg)
            event('change', arg)
            setTimeout(() => {
              console.log(props.formData[props.formItem.prop!], arg)
            }, 1000)
          }}
          {...isProperty(
            {
              formData: props.formData,
              index: props.index!,
              formItem: props.formItem,
            },
            data.value?.property
          )}
        />
      </>
    )
  },
})

export default FRate
