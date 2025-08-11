/*
 * @Author: peng-xiao-shuai
 * @Date: 2023-11-21 19:06:08
 * @LastEditors: peng-xiao-shuai
 * @LastEditTime: 2023-11-24 10:59:02
 * @Description:
 */
import { ElCheckbox, ElCheckboxGroup } from 'element-plus'
import type { FormTypeEnum, SetDataType } from '~/index'
import { isBolOrFun } from '~/index'
import {
  componentProps,
  isProperty,
  useEvent,
} from '~/powerful-form/src/form-view-data'

export const FCheckbox = defineComponent({
  name: 'FCheckbox',
  props: componentProps(),
  setup(props) {
    const data = computed(
      () => props.formItem.data as SetDataType<FormTypeEnum.Checkbox>
    )
    const { event } = useEvent<FormTypeEnum.Checkbox>({
      formData: props.formData,
      index: props.index!,
      formItem: props.formItem,
    })

    return () => (
      <>
        <ElCheckboxGroup
          v-model={props.formData[props.formItem.prop!]}
          style={data.value?.style || {}}
          onChange={(...arg: any) => event('change', ...arg)}
          {...isProperty(
            {
              formData: props.formData,
              index: props.index!,
              formItem: props.formItem,
            },
            data.value?.property
          )}
        >
          {data.value?.options.map((checkbox) => (
            <ElCheckbox
              label={checkbox.label}
              disabled={isBolOrFun(checkbox.disabled, {
                formData: props.formData,
                formItem: props.formItem,
                index: props.index!,
              })}
              border={checkbox.border}
              name={checkbox.name}
            >
              {checkbox.text || checkbox.label}
            </ElCheckbox>
          ))}
        </ElCheckboxGroup>
      </>
    )
  },
})

export default FCheckbox
