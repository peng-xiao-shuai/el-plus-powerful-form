import powerfulForm from './powerful-form'
import { PowerfulFormSymbol } from './keys'
import components from './components'
import type { InjectProps } from '~/index'
import type { App, Plugin } from 'vue'
import type { FormType } from '#/form-view'
export * from './powerful-form'
export * from '~/utils'
export * from '~/hooks/useGetRefs'
export type * from '../typings/index'

// 获取类型
export const getType = <T>(target: T) =>
  Object.prototype.toString.call(target).slice(8, -1)

// 深度克隆
export const deepClone = <T>(target: T) => {
  let result
  if (getType(target) === 'Object') {
    result = {} as T
  } else if (getType(target) === 'Array') {
    result = [] as T
  } else result = target

  for (const i in target) {
    const item = target[i]
    if (getType(item) === 'Object' || getType(item) === 'Array') {
      result[i] = deepClone(item)
    } else result[i] = item
  }
  return result
}

export const formViewSetData = <T extends keyof FormType>(
  data: FormType[T]
): FormType[T] => data

export const componentRegister = (app: App) => {
  components.forEach((c) => {
    if (!app._context.components[c.name!]) {
      app.component(c.name!, c)
    }
  })
}

const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App, options?: InjectProps) => {
    components.forEach((c) => {
      app.use(c)
    })
    app.provide(PowerfulFormSymbol, options ? options : {})
  }

  return install
}

export default {
  install: makeInstaller([powerfulForm]),
}
