import type { SFCWithInstall } from 'element-plus/es/utils'
import { componentProps } from '~/powerful-form/src/form-view-data'

const RenderJsx = defineComponent({
  name: 'FRenderJsx',
  props: componentProps(),
  setup(props) {
    return () => (
      <>{props.formItem.render?.(h, props.formData, props.index as number)}</>
    )
  },
})

const FRenderJsx = RenderJsx as SFCWithInstall<typeof RenderJsx>
export { FRenderJsx }
export default RenderJsx
