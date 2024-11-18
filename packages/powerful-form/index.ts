import FormViewComponent from './src/form-view.vue'
import type { SFCWithInstall } from 'element-plus/es/utils'
import type { App } from 'vue'
export { FormTypeEnum } from './src/form-view-data'

// 定义 install 方法， App 作为参数
FormViewComponent.install = (app: App): void => {
  app.component('PowerfulForm', FormViewComponent)
}
const PowerfulForm = FormViewComponent as SFCWithInstall<
  typeof FormViewComponent
>

export { FormViewComponent, PowerfulForm, PowerfulForm as default }
