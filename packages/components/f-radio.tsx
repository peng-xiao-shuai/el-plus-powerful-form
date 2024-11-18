/*
 * @Author: peng-xiao-shuai
 * @Date: 2023-11-21 19:06:08
 * @LastEditors: peng-xiao-shuai
 * @LastEditTime: 2023-11-24 10:55:22
 * @Description:
 */
import { ElRadio, ElRadioGroup } from 'element-plus'
import 'element-plus/theme-chalk/src/radio-group.scss'
import 'element-plus/theme-chalk/src/radio.scss'
import type { FormTypeEnum, SetDataType } from '~/index'
import { isBolOrFun } from '~/index'
import {
  componentProps,
  isProperty,
  useEvent,
} from '~/powerful-form/src/form-view-data'
export const FRadio = defineComponent({
  name: 'FRadio',
  props: componentProps(),
  setup(props) {
    const data = props.formItem.data as SetDataType<FormTypeEnum.Radio>

    const { event } = useEvent<FormTypeEnum.Radio>({
      formData: props.formData,
      index: props.index!,
      formItem: props.formItem,
    })

    return () => (
      <>
        <ElRadioGroup
          v-model={props.formData[props.formItem.prop!]}
          style={data?.style || {}}
          onChange={(...arg: any) => event('change', ...arg)}
          {...isProperty(
            {
              formData: props.formData,
              index: props.index!,
              formItem: props.formItem,
            },
            data?.property
          )}
        >
          {data?.options.map((radio) => (
            <ElRadio
              label={radio.label}
              disabled={isBolOrFun(radio.disabled, {
                formData: props.formData,
                formItem: props.formItem,
                index: props.index!,
              })}
              border={radio.border}
              name={radio.name}
            >
              {radio.text || radio.label}
            </ElRadio>
          ))}
        </ElRadioGroup>
      </>
    )
  },
})

export default FRadio
