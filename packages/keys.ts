import type { InjectionKey } from 'vue'

export const PowerfulFormSymbol = Symbol('powerful-form') as InjectionKey<
  import('~/index').InjectProps
>
