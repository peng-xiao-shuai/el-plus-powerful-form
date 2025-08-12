/*
 * @Author: peng-xiao-shuai
 * @Date: 2023-11-21 20:08:39
 * @LastEditors: peng-xiao-shuai
 * @LastEditTime: 2023-11-24 11:07:01
 * @Description:
 */
import { FInput } from './f-input'
import { FSwitch } from './f-switch'
import { FRate } from './f-rate'
import { FSelect } from './f-select'
import { FDatePicker } from './f-date-picker'
import { FRadio } from './f-radio'
import { FCheckbox } from './f-checkbox'
import { FRenderJsx } from './f-render-jsx'
// import { FUploadFile } from './f-upload-file'
// import { FUploadMedia } from './f-upload-media'

export * from './f-input'
export * from './f-switch'
export * from './f-rate'
export * from './f-select'
export * from './f-date-picker'
export * from './f-radio'
export * from './f-checkbox'
export * from './f-render-jsx'

export default [
  FInput,
  FSwitch,
  FRate,
  FSelect,
  FDatePicker,
  FRadio,
  FCheckbox,
  FRenderJsx,
]
