/*
 * @Author: peng-xiao-shuai
 * @Date: 2023-11-24 14:20:56
 * @LastEditors: peng-xiao-shuai
 * @LastEditTime: 2023-11-24 14:46:00
 * @Description:
 */
import UploadFile from '../../com-upload-file.vue'
import type { FormTypeEnum, SetDataType } from '~/index'
import {
  componentProps,
  isProperty,
  useEvent,
} from '~/powerful-form/src/form-view-data'
export const FUploadFile = defineComponent({
  name: 'FUploadFile',
  props: componentProps(),
  setup(props) {
    const data = computed(
      () => props.formItem.data as SetDataType<FormTypeEnum.UploadFile>
    )

    const { event } = useEvent<FormTypeEnum.UploadFile>({
      formData: props.formData,
      index: props.index!,
      formItem: props.formItem,
    })
    return () => (
      <>
        <UploadFile
          style={data.value?.style || {}}
          onUploadFileSuccess={(...arg: any) => {
            event('upload-file-success', ...arg)
          }}
          onUploadFileDelete={(...arg: any) => {
            event('upload-file-delete', ...arg)
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
