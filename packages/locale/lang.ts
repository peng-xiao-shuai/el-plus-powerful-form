import { inject } from 'vue'
import { useGlobalConfig } from 'element-plus/es'
import LangPackages from './packages'
import type { LangKey } from './packages'
import { PowerfulFormSymbol } from '~/keys'
export { LangKey } from './packages'

export const useLocale = () => {
  Object.assign(LangPackages, inject(PowerfulFormSymbol, {})?.locale || {})

  const t = <K extends LangKey>(
    key: K
  ): (typeof LangPackages)[keyof typeof LangPackages][K] => {
    let lang = (useGlobalConfig()?.value?.locale?.name ||
      'en') as keyof typeof LangPackages

    if (!Object.keys(LangPackages).includes(lang)) lang = 'en'

    return LangPackages[lang][key] || key
  }
  return { t }
}
