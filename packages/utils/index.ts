/*
 * @Author: peng-xiao-shuai
 * @Date: 2023-11-21 18:12:55
 * @LastEditors: peng-xiao-shuai
 * @LastEditTime: 2023-11-27 10:10:11
 * @Description: 表单组件工具函数
 */
import type { FormItem, FormType, FunBol, PowerfulFormData } from '~/index'
import type { FormItemRule } from 'element-plus'
import { FormTypeEnum } from '~/powerful-form/src/form-view-data'
import { LangKey } from '~/locale/lang'

/**
 * 校验规则
 */
export const verify = {
  phone: {
    pattern:
      /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/,
    message: LangKey.VerifyPhone,
    trigger: 'blur',
  },
  email: {
    type: 'email',
    message: LangKey.VerifyEmail,
    trigger: 'blur',
  },
  code: {
    pattern:
      /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/,
    message: LangKey.VerifyCode,
    trigger: 'blur',
  },
  https: {
    pattern:
      /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/,
    message: LangKey.VerifyHttps,
    trigger: 'blur',
  },
  ip: {
    pattern:
      /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/,
    message: LangKey.VerifyIp,
    trigger: 'blur',
  },
  number: {
    pattern: /^\d+$/,
    message: LangKey.VerifyNumber,
    trigger: 'blur',
  },
  english: {
    pattern: /^[A-Za-z]+$/,
    message: LangKey.VerifyEnglish,
    trigger: 'blur',
  },
  chinese: {
    pattern: /^[\u4E00-\u9FA5]+$/,
    message: LangKey.VerifyChinese,
    trigger: 'blur',
  },
}

export const verifyFormItemRule: { [s: string]: FormItemRule } =
  Object.assign(verify)

/**
 * @description 类型保护
 * @see https://www.tslang.cn/docs/handbook/advanced-types.html 搜索 “自定义类型保护”
 * @param {T} obj 值，它必须是联合类型
 * @param {(obj: T) => boolean} cb 回调函数，返回一个布尔值
 * @example
 * const a = [] | string
 * a.push() // 报错
 * if (isTypeProtect<typeof a, []>(a, (a) => Array.isArray(a))) {
 *   a.push() // 正常
 * }
 * @returns {boolean}
 */
export const isTypeProtect = <T, P extends T>(
  obj: T,
  cb: (obj: T) => boolean
): obj is P => cb(obj)

/**
 * 匹配组件
 * @param {Exclude<keyof FormType, 'slot'>} type 类型
 * @returns 组件名称
 */
export const matchComponents = (type: Exclude<keyof FormType, 'slot'>) => {
  return {
    [FormTypeEnum.Switch]: 'FSwitch',
    [FormTypeEnum.Input]: 'FInput',
    [FormTypeEnum.Textarea]: 'FInput',
    [FormTypeEnum.Rate]: 'FRate',
    [FormTypeEnum.Select]: 'FSelect',
    [FormTypeEnum.DatePicker]: 'FDatePicker',
    [FormTypeEnum.Radio]: 'FRadio',
    [FormTypeEnum.Checkbox]: 'FCheckbox',
    [FormTypeEnum.UploadFile]: 'FUploadFile',
    [FormTypeEnum.UploadMedia]: 'FUploadMedia',
  }[type]
}

/**
 * 是否是boolean 还是 fun 函数类型
 * @param val 值
 * @param params val 为函数类型时 参数
 * @returns {boolean} true 为禁用
 */
export const isBolOrFun = (
  val: FunBol,
  params: {
    formData: PowerfulFormData['formData']
    formItem: FormItem
    index: number
  }
): boolean => {
  if (val) {
    if (typeof val === 'boolean') return val
    else val(params)
  }
  return false
}

/**
 * 清除：和 空格
 */
export const clearSymbol = (v: string | undefined) => {
  return v?.replace(/[：:]{1}\s*$/g, '')
}
