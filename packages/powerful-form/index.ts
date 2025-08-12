import PowerfulFormComponent from './src/form-view.vue'
import type { SFCWithInstall } from 'element-plus/es/utils'
import type { App } from 'vue'
export enum FormTypeEnum {
  Select = 'select',
  Input = 'input',
  Switch = 'switch',
  Rate = 'rate',
  Slot = 'slot',
  Textarea = 'textarea',
  DatePicker = 'datePicker',
  UploadFile = 'uploadFile',
  Radio = 'radio',
  Checkbox = 'checkbox',
  UploadMedia = 'uploadMedia',
}
// 定义 install 方法， App 作为参数
PowerfulFormComponent.install = (app: App): void => {
  app.component('PowerfulForm', PowerfulFormComponent)
}
const PowerfulForm = PowerfulFormComponent as SFCWithInstall<
  typeof PowerfulFormComponent
>

export { PowerfulFormComponent, PowerfulForm, PowerfulForm as default }
