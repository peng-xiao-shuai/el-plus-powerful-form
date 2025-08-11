/*
 * @Author: peng-xiao-shuai
 * @Date: 2023-11-12 22:41:45
 * @LastEditors: peng-xiao-shuai
 * @LastEditTime: 2023-12-19 11:10:38
 * @Description:
 */
import { ElDatePicker } from 'element-plus'
import type { FormTypeEnum, SetDataType } from '~/index'
import {
  componentProps,
  isProperty,
  useEvent,
} from '~/powerful-form/src/form-view-data'

export const FDatePicker = defineComponent({
  name: 'FDatePicker',
  props: componentProps(),
  setup(props) {
    const data = computed(
      () => props.formItem.data as SetDataType<FormTypeEnum.DatePicker>
    )

    const { event } = useEvent<FormTypeEnum.DatePicker>({
      formData: props.formData,
      index: props.index!,
      formItem: props.formItem,
    })

    return () => (
      <>
        <ElDatePicker
          v-model={props.formData[props.formItem.prop!]}
          style={data.value?.style || (props.inline ? {} : { width: '100%' })}
          // ElDatePicker 未提供事件类型，但是不影响正常使用
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          // @ts-expect-error
          onChange={(...arg: any) => event('change', ...arg)}
          onBlur={(...arg: any) => event('blur', ...arg)}
          onFocus={(...arg: any) => event('focus', ...arg)}
          onCalendarChange={(...arg: any) => event('calendar-change', ...arg)}
          onPanelChange={(...arg: any) => event('panel-change', ...arg)}
          onVisibleChange={(...arg: any) => event('visible-change', ...arg)}
          valueFormat="YYYY-MM-DD HH:mm:ss"
          type="daterange"
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

export default FDatePicker
