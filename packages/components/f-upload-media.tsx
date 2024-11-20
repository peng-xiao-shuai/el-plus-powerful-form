/*
 * @Author: peng-xiao-shuai
 * @Date: 2023-11-24 14:20:56
 * @LastEditors: peng-xiao-shuai
 * @LastEditTime: 2023-12-05 18:25:36
 * @Description:
 */
import UploadMedia from '../../com-upload-media.vue'
import type { FormTypeEnum, SetDataType } from '~/index'
import {
  componentProps,
  isProperty,
  useEvent,
} from '~/powerful-form/src/form-view-data'
export const FUploadMedia = defineComponent({
  name: 'FUploadMedia',
  props: componentProps(),
  setup(props) {
    const data = computed(
      () => props.formItem.data as SetDataType<FormTypeEnum.UploadMedia>
    )

    const { event } = useEvent<FormTypeEnum.UploadMedia>({
      formData: props.formData,
      index: props.index!,
      formItem: props.formItem,
    })
    return () => (
      <>
        <UploadMedia
          style={data.value?.style || {}}
          onFilesChange={(...arg: any) => {
            event('files-change', ...arg)
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
