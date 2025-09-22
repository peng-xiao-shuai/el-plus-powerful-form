import type { FormTypeEnum, verify } from '../index'
import type { h as createElement } from 'vue'
import type {
  InputEmit,
  LangPackages,
  PowerfulTableHeader,
  PowerfulTableHeaderProps,
  RateEmit,
  SwitchEmit,
} from 'el-plus-powerful-table'
import type {
  CheckboxGroupProps,
  DatePickerProps,
  FormInstance,
  FormItemProps,
  FormItemRule,
  FormProps,
  FormRules,
  InputProps,
  RadioGroupProps,
  RateProps,
  SelectV2Context,
  SwitchProps,
} from 'element-plus'
import type {
  CSSProperties,
  ComponentPublicInstance,
  Ref,
  SetupContext,
  VNode,
  WatchStopHandle,
} from 'vue'
import type { JSX } from 'vue/jsx-runtime'

// 组件注入数据
export type InjectProps = {
  /**
   * 语言包
   * @see https://github.com/peng-xiao-shuai/el-plus-powerful-table/blob/master-ts/packages/locale/packages.ts
   */
  locale?: LangPackages
}

export type FormType = {
  [FormTypeEnum.UploadFile]: UploadFileDataType
  [FormTypeEnum.Switch]: SwitchDataType
  [FormTypeEnum.Input]: InputDataType
  [FormTypeEnum.Select]: SelectDataType
  [FormTypeEnum.Rate]: RateDataType
  [FormTypeEnum.Slot]: null
  [FormTypeEnum.Textarea]: InputDataType
  [FormTypeEnum.DatePicker]: DatePickerDataType
  [FormTypeEnum.Radio]: RadioDataType
  [FormTypeEnum.Checkbox]: CheckboxDataType
  [FormTypeEnum.UploadFile]: UploadFileDataType
  [FormTypeEnum.UploadMedia]: UploadMediaDataType
}

export type FormEventType =
  | FormTypeEnum.UploadFile
  | FormTypeEnum.UploadMedia
  | FormTypeEnum.Switch
  | FormTypeEnum.Input
  | FormTypeEnum.Select
  | FormTypeEnum.Rate
  | FormTypeEnum.Textarea
  | FormTypeEnum.DatePicker
  | FormTypeEnum.Radio
  | FormTypeEnum.Checkbox

export type SetDataType<T extends keyof FormType> = {
  [key in keyof FormType[T]]: FormType[T][key]
}

type ElComponentProp<P = any> =
  | Partial<P>
  | (({
      formData,
      index,
      formItem,
    }: {
      /**
       * formData 数据
       */
      formData: PowerfulFormData['formData']
      index: number
      /**
       * formItem 数据
       */
      formItem: FormItem
    }) => Partial<P>)

type SlotFun = (
  h: typeof createElement,
  row: PowerfulFormData['formData'],
  index: number
) => string | number | VNode | JSX.Element

type FunBol =
  | boolean
  | (({
      formData,
      formItem,
      index,
    }: {
      formData: PowerfulFormData['formData']
      formItem: FormItem
      index: number
    }) => boolean)
  | undefined

export type SwitchDataType = {
  /**
   * 样式
   */
  style?: CSSProperties | undefined
  /**
   * 事件合集
   */
  on?: SwitchEmit<{
    /**
     * 表单配置项数据
     */
    formItem: FormItem
    /**
     * 索引
     */
    index: number
    /**
     * 表单数据
     */
    formData: PowerfulFormData['formData']
  }>
  /**
   * el-switch 组件 props
   * @see https://element-plus.gitee.io/zh-CN/component/switch.html#attributes
   */
  property?: ElComponentProp<SwitchProps>
}
export type InputDataType = {
  /**
   * 插槽的内容
   */
  symbol?: string
  /**
   * 样式
   */
  style?: CSSProperties
  /**
   * 如果只需要一个插槽的话可以使用 slot 参数，配合 symbol 实现
   */
  slot?: 'prepend' | 'append' | 'prefix' | 'suffix'
  /**
   * 事件合集
   */
  on?: InputEmit<{
    /**
     * 表单配置项数据
     */
    formItem: FormItem
    /**
     * 索引
     */
    index: number
    /**
     * 表单数据
     */
    formData: PowerfulFormData['formData']
  }>
  slots?: {
    /**
     * 前缀插槽
     */
    prefix?: SlotFun
    /**
     * 后缀插槽
     */
    suffix?: SlotFun
    /**
     * 前置插槽
     */
    prepend?: SlotFun
    /**
     * 后置插槽
     */
    append?: SlotFun
  }
  /**
   * el-input 组件 props
   * @see https://element-plus.gitee.io/zh-CN/component/input.html#attributes
   */
  property?: ElComponentProp<InputProps>
}
export type RateDataType = {
  /**
   * 样式
   */
  style?: CSSProperties
  /**
   * 事件合集
   */
  on?: RateEmit<{
    /**
     * 表单配置项数据
     */
    formItem: FormItem
    /**
     * 索引
     */
    index: number
    /**
     * 表单数据
     */
    formData: PowerfulFormData['formData']
  }>
  /**
   * el-rate 组件 props
   * @see https://element-plus.gitee.io/zh-CN/component/rate.html#attributes
   */
  property?: ElComponentProp<RateProps>
}

export type SelectEmit<T> = {
  /**
   * change 事件
   */
  change?: (parameter: T, ...arg: any) => void
  /**
   * 聚焦事件
   */
  focus?: (parameter: T, ...arg: any) => void
  /**
   * 失焦事件
   */
  blur?: (parameter: T, ...arg: any) => void
  /**
   * 清除事件
   */
  clear?: (parameter: T, ...arg: any) => void
  /**
   * 删除标签事件，多选情况下存在
   */
  'remove-tag'?: (parameter: T, ...arg: any) => void
  /**
   * 显示隐藏事件
   */
  'visible-change'?: (parameter: T, ...arg: any) => void
}
export type SelectDataType = {
  /**
   * 样式
   */
  style?: CSSProperties
  /**
   * el-select-v2 组件 props.props，默认读取 PowerfulTableHeaderProps 类型下的 filters
   */
  options?: SelectV2Context['props']['options']
  /**
   * 事件合集
   */
  on?: SelectEmit<{
    /**
     * 表单配置项数据
     */
    formItem: FormItem
    /**
     * 索引
     */
    index: number
    /**
     * 表单数据
     */
    formData: PowerfulFormData['formData']
  }>
  /**
   * 插槽
   */
  slots?: {
    /**
     * 默认插槽 option 内容，权重最高
     */
    default?: SlotFun
    /**
     * 空插槽，当没有数据时显示
     */
    empty?: SlotFun
    /**
     * 前置插槽
     */
    prefix?: SlotFun
  }
  /**
   * el-select-v2 组件 props
   * @see https://element-plus.gitee.io/zh-CN/component/select.html#attributes
   */
  property?: ElComponentProp<SelectV2Context['props']>
}

export type UploadFileEmit<T> = {
  /**
   * 上传成功事件
   */
  'upload-file-success'?: (parameter: T, ...arg: any) => void
  /**
   * 删除事件
   */
  'upload-file-delete'?: (parameter: T, ...arg: any) => void
}
/**
 * @see http://docs.geekclo.com/#/fe/demo-platform/components/com-upload-media/?id=props
 */
export type UploadFileProp = Readonly<{
  /**
   * 原始数据
   */
  originData: string | []

  /**
   * 是否允许多选
   * @default false
   */
  multiple: boolean

  /**
   * 最大文件大小
   */
  maxSize: number

  /**
   * 允许的类型
   */
  allowedTypes: string
}>
export type UploadFileDataType = {
  /**
   * 样式
   */
  style?: CSSProperties
  /**
   * 事件合集
   */
  on?: UploadFileEmit<{
    /**
     * 表单配置项数据
     */
    formItem: FormItem
    /**
     * 索引
     */
    index: number
    /**
     * 表单数据
     */
    formData: PowerfulFormData['formData']
  }>
  /**
   * com-upload-file 组件 props
   * @see http://docs.geekclo.com/#/fe/demo-platform/components/upload-file/?id=props
   */
  property?: ElComponentProp<UploadFileProp>
}

export type UploadMediaEmit<T> = {
  /**
   * 上传事件
   */
  'files-change'?: (parameter: T, ...arg: any) => void
}
/**
 * @see http://docs.geekclo.com/#/fe/demo-platform/components/com-upload-media/?id=props
 */
export type UploadMediaProp = Readonly<{
  /**
   * 默认数据类型可以是字符串、数组或者对象
   */
  defaultData: string | [] | object

  /**
   * 文件夹路径
   * @default 'resources'
   */
  folder: string

  /**
   * 是否为迷你模式
   * @default false
   */
  isMini: boolean

  /**
   * 限制数量。限制文件上传数量，当值为 0 时不限
   * @default 0
   */
  limit: number

  /**
   * 媒体类型可以是图片、视频、音频或者混合类型
   * @default 'image'
   */
  mediaType: 'image' | 'video' | 'audio' | 'imageVideoMixed'

  /**
   * 接受的文件类型。进一步补充允许上传的文件规则，此属性会覆盖根据mediaType自动设定的规则
   */
  acceptType: string

  /**
   * 单个图片大小限制，单位M
   * @default 2
   */
  imageMaxSize: number

  /**
   * 单个音频大小限制，单位M
   * @default 20
   */
  audioMaxSize: number

  /**
   * 单个视频大小限制，单位M
   * @default 70
   */
  videoMaxSize: number

  /**
   * 是否需要标题
   * @default false
   */
  needTitle: boolean

  /**
   * 是否需要封面
   * @default false
   */
  needPoster: boolean
}>
export type UploadMediaDataType = {
  /**
   * 样式
   */
  style?: CSSProperties
  /**
   * 事件合集
   */
  on?: UploadMediaEmit<{
    /**
     * 表单配置项数据
     */
    formItem: FormItem
    /**
     * 索引
     */
    index: number
    /**
     * 表单数据
     */
    formData: PowerfulFormData['formData']
  }>
  /**
   * com-upload-media 组件 props
   */
  property?: ElComponentProp<UploadMediaProp>
}

export type DatePickerEmit<T> = {
  /**
   * change 事件
   */
  change?: ((parameter: T, ...arg: any) => void) | undefined
  /**
   * 失焦事件
   */
  blur?: ((parameter: T, ...arg: any) => void) | undefined
  /**
   * 聚焦事件
   */
  focus?: ((parameter: T, ...arg: any) => void) | undefined
  /**
   * calendar-change 事件
   */
  'calendar-change'?: ((parameter: T, ...arg: any) => void) | undefined
  /**
   * panel-change 事件
   */
  'panel-change'?: (parameter: T, ...arg: any) => void
  /**
   * 显示隐藏事件
   */
  'visible-change'?: (parameter: T, ...arg: any) => void
}
export type DatePickerDataType = {
  /**
   * 样式
   */
  style?: CSSProperties
  /**
   * 事件合集
   */
  on?: DatePickerEmit<{
    /**
     * 表单配置项数据
     */
    formItem: FormItem
    /**
     * 索引
     */
    index: number
    /**
     * 表单数据
     */
    formData: PowerfulFormData['formData']
  }>
  /**
   * 插槽
   */
  slots?: {
    /**
     * 默认插槽
     */
    default?: SlotFun
    /**
     * 范围分隔符插槽
     */
    'range-separator'?: SlotFun
  }
  /**
   * el-date-picker props
   * @see https://element-plus.gitee.io/zh-CN/component/date-picker.html#attributes
   */
  property?: ElComponentProp<DatePickerProps>
}

export type RadioDataEmit<T> = {
  /**
   * change 事件
   */
  change?: ((parameter: T, ...arg: any) => void) | undefined
}
export interface RadioOptions {
  /**
   * Radio 自定义内容，没有则显示 label
   */
  text?: string
  /**
   * Radio label
   */
  label: string
  /**
   * 是否禁用复选框形式的表单
   */
  disabled?: FunBol
  /**
   * 是否显示边框
   */
  border?: boolean
  /**
   * 表单的名称
   */
  name?: string
}
export type RadioDataType = {
  /**
   * 样式
   */
  style?: CSSProperties
  /**
   * 事件合集
   */
  on?: RadioDataEmit<{
    /**
     * 表单配置项数据
     */
    formItem: FormItem
    index: number
    formData: PowerfulFormData['formData']
  }>
  /**
   * 单选按钮数据 参考 radio props
   */
  options: RadioOptions[]
  /**
   * radio-group props
   * @see https://element-plus.gitee.io/zh-CN/component/radio.html#radiogroup-attributes
   */
  property?: ElComponentProp<RadioGroupProps>
}

export type CheckboxOptions = RadioOptions
export type CheckboxDataEmit = RadioDataEmit<{
  /**
   * 表单配置项数据
   */
  formItem: FormItem
  /**
   * 索引
   */
  index: number
  /**
   * 表单数据
   */
  formData: PowerfulFormData['formData']
}>
export type CheckboxDataType = {
  /**
   * 样式
   */
  style?: CSSProperties
  /**
   * 事件合集
   */
  on?: CheckboxDataEmit
  /**
   * 复选按钮数据
   */
  options: CheckboxOptions[]
  /**
   * checkbox-group props
   * @see  https://element-plus.gitee.io/zh-CN/component/checkbox.html#checkboxgroup-attributes
   */
  property?: ElComponentProp<CheckboxGroupProps>
}

export type FormItemData =
  | {
      /**
       * 默认 `input` 类型
       * @default FormTypeEnum.Input
       */
      type?: FormTypeEnum.Input
      /**
       * PowerfulTableHeaderProps.type === FormItem.type 则继承 PowerfulTableHeaderProps.data
       */
      data?: SetDataType<FormTypeEnum.Input>
    }
  | {
      type?: FormTypeEnum.Switch
      data?: SetDataType<FormTypeEnum.Switch>
    }
  | {
      type?: FormTypeEnum.Select
      data?: SetDataType<FormTypeEnum.Select>
    }
  | {
      type?: FormTypeEnum.Rate
      data?: SetDataType<FormTypeEnum.Rate>
    }
  | {
      type?: FormTypeEnum.Slot
      data?: SetDataType<FormTypeEnum.Slot>
    }
  | {
      type?: FormTypeEnum.Textarea
      data?: SetDataType<FormTypeEnum.Textarea>
    }
  | {
      type?: FormTypeEnum.DatePicker
      data?: SetDataType<FormTypeEnum.DatePicker>
    }
  | {
      type?: FormTypeEnum.Radio
      data?: SetDataType<FormTypeEnum.Radio>
    }
  | {
      type?: FormTypeEnum.Checkbox
      data?: SetDataType<FormTypeEnum.Checkbox>
    }
  | {
      type?: FormTypeEnum.UploadFile
      data?: SetDataType<FormTypeEnum.UploadFile>
    }
  | {
      type?: FormTypeEnum.UploadMedia
      data?: SetDataType<FormTypeEnum.UploadMedia>
    }

export type FormItem<Row = any> = {
  /**
   * el-form-item prop 属性。默认读取 PowerfulTableHeaderProps 下 prop
   */
  prop: PowerfulTableHeaderProps<Row>['prop']
  /**
   * el-form-item label 属性。默认读取 PowerfulTableHeader 下 label
   */
  text: PowerfulTableHeaderProps<Row>['text']
  /**
   * 插槽名称。默认读取 PowerfulTableHeaderProps 下 slotName
   */
  slotName?: PowerfulTableHeaderProps<Row>['slotName']
  /**
   * 渲染函数
   */
  render?: PowerfulTableHeaderProps<Row>['render']
  /**
   * flex-basis 属性，当期元素宽度占比，当两个相邻的元素为 `48%` 时，则这个两个元素在一行
   * @default '100%'
   */
  basis?: string
  /**
   * 显示类型，部分数据只在新增表单显示，部分只在修改表单显示。默认全部显示。如果传递此值将和 props.showType 进行比较，相等则显示
   * @default ''
   */
  showType?: string | string[]
  /**
   * 是否显示，优先级比 showType 高
   * @default undefined
   */
  visible?: (row: Row, showType?: string) => boolean
  /**
   * 表单数据数据默认值，默认寻找 PowerfulFormProps
   * @default {}
   */
  defaultData?: number | [] | object | string | boolean
  /**
   * 规则校验，可以传递完整的 rule 规则，也可以传递部分规则例如：
   * rule = true 开启必填校验；
   * rule = [1, 10] 开启长度校验；
   * rule = 'phone' 开启手机号校验；
   */
  rule?: FormItemRule[] | true | [number, number] | keyof typeof verify

  /**
   * formItem props
   * @see https://element-plus.gitee.io/zh-CN/component/form.html#formitem-attributes
   */
  property?: Partial<FormItemProps>
} & FormItemData

export interface PowerfulFormPTHeaders<Row = any>
  extends PowerfulTableHeader<Row> {
  props: PTHeadersProps<Row> | PTHeadersProps<Row>[]
}

export type PTHeadersProps<Row = any> = PowerfulTableHeaderProps<Row> & {
  /**
   * 表单配置项
   */
  formItem?: Partial<FormItem<Row>>
}

export type PowerfulFormListApi = (params: object) => Promise<any>

/* ------ props ------ */
export interface PowerfulFormProps {
  /**
   * 显示类型
   */
  showType?: string
  /**
   * 是否显示label
   * @default true
   */
  showLabel?: boolean
  /**
   * 是否继承表格。如果是 `true` 的话自动查找 `table` 组件 `ref` 名称为 `PTable` 的，也可以传递 `table` 的 `Ref` 名称
   * @default false
   */
  extendTable?: boolean | string
  /**
   * 表单配置
   */
  formItems?: FormItem[]

  /**
   * 表单默认值
   * @default {}
   */
  formDataDefault: object & { [s: string]: FormItem['defaultData'] }

  /**
   * 表单是否禁用
   */
  disabled?: boolean

  /**
   * form 组件 props
   * @see https://element-plus.gitee.io/zh-CN/component/form.html#form-attributes
   */
  property?: Partial<FormProps>

  /**
   * apis 接口合集
   * @example
   * <FormView ... :apis="() => Promise.resolve({ data: [] })" />
   * <FormView ... showType="update" :apis="{
   *  'added': () => Promise.resolve({ data: [] })
   *  'update': () => Promise.resolve({ data: [] })
   * }" />
   */
  apis?:
    | {
        [key: string]: PowerfulFormListApi
      }
    | PowerfulFormListApi
}

export interface PowerfulFormData {
  /**
   * 表单项数组
   */
  formItems: FormItem[]
  /**
   * 监听停止处理函数数组
   */
  watchCache: WatchStopHandle[]
  /**
   * 表单数据对象
   */
  formData: object & { [s: string]: any }
  /**
   * 表单规则对象
   */
  rules: FormRules
}

export interface PowerfulFormExpose {
  $slots: SetupContext['slots']
  $attrs: SetupContext['attrs']
  $refs: {
    /**
     * 表单 Ref 实例
     */
    elFormRef: Ref<Ref<FormInstance>>
  }
  /**
   * 组件 props
   */
  readonly props: PowerfulFormProps
  /**
   * 表单数据
   */
  readonly powerfulFormData: PowerfulFormData
  /**
   * formItems 更具 props.showType 过滤后的数据
   */
  readonly formItems: FormItem[]
  /**
   * 提交校验函数
   * @param {object} [params = {}] apis 请求的格外参数
   * @param {object} [options = {}] 提示信息
   */
  readonly submitForm: (
    params?: object,
    options?: {
      successMessage?: string
      errorMessage?: string
      /**
       * Api 接口触发后，成功返回 success 否则返回 error。第二个参数返回接口返回的数据（如果存在，如果有拦截器，受拦截器影响）
       */
      cb: (type: 'success' | 'error', res?: any) => void
    }
  ) => Promise<boolean>

  /**
   * 重置表单数据
   */
  readonly resetForm: () => void

  /**
   * 控制显示隐藏表单
   */
  readonly visibleFormTrigger: () => boolean

  /**
   * 刷新表单数据，重新从表格中获取数据
   */
  readonly refreshRender: (
    refName?: string,
    proxy?: ComponentPublicInstance
  ) => void
}
