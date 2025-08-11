/*
 * @Author: peng-xiao-shuai
 * @Date: 2023-11-23 11:46:38
 * @LastEditors: peng-xiao-shuai
 * @LastEditTime: 2023-12-19 11:10:54
 * @Description:
 */
import { ElSelectV2 } from 'element-plus'
import type { FormTypeEnum, SetDataType } from '~/index'
import { clearSymbol } from '~/utils'
import {
  componentProps,
  isProperty,
  useEvent,
} from '~/powerful-form/src/form-view-data'
export const FSelect = defineComponent({
  name: 'FSelect',
  props: componentProps(),
  setup(props) {
    const data = computed(
      () => props.formItem.data as SetDataType<FormTypeEnum.Select>
    )

    const { event } = useEvent<FormTypeEnum.Select>({
      formData: props.formData,
      index: props.index!,
      formItem: props.formItem,
    })

    return () => (
      <>
        <ElSelectV2
          v-model={props.formData[props.formItem.prop!]}
          style={
            data.value?.style ||
            (props.inline ? { width: '192px' } : { width: '100%' })
          }
          options={data.value?.options || []}
          onChange={(...arg: any) => {
            event('change', ...arg)
          }}
          placeholder={`请选择${clearSymbol(props.formItem.text)}`}
          v-slots={{
            default: () =>
              data.value?.slots?.default?.(h, props.formData, props.index!),
            empty: () =>
              data.value?.slots?.empty?.(h, props.formData, props.index!),
            prefix: () =>
              data.value?.slots?.prefix?.(h, props.formData, props.index!),
          }}
          clearable
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

export default FSelect
