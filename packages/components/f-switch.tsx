/*
 * @Author: peng-xiao-shuai
 * @Date: 2023-11-12 22:41:45
 * @LastEditors: peng-xiao-shuai
 * @LastEditTime: 2023-11-24 12:15:00
 * @Description:
 */
import { ElSwitch } from 'element-plus'
import type { FormTypeEnum, SetDataType } from '~/index'
import { componentProps, isProperty, useEvent } from '~/index'

export const FSwitch = defineComponent({
  name: 'FSwitch',
  props: componentProps(),
  setup(props) {
    const data = props.formItem.data as SetDataType<FormTypeEnum.Switch>

    const { event } = useEvent<FormTypeEnum.Switch>({
      formData: props.formData,
      index: props.index!,
      formItem: props.formItem,
    })

    return () => (
      <>
        <ElSwitch
          style={data?.style || {}}
          v-model={props.formData[props.formItem.prop!]}
          active-value={'1'}
          inactive-value={'0'}
          onChange={(...arg: any) => {
            event('change', ...arg)
          }}
          {...isProperty(
            {
              formData: props.formData,
              index: props.index!,
              formItem: props.formItem,
            },
            data?.property
          )}
        />
      </>
    )
  },
})

export default FSwitch
