import workConfig from '@/config/workConfig'
import { clientLog } from '@/utils/common/logger'
import { isPlainObject, isString, sortBy } from 'lodash'
import { I18nComponentsNames } from '../config/consts'

function isComponentNameType(
  value: unknown
): value is I18nComponent.ComponentNameType {
  return isString(value) && I18nComponentsNames.includes(value as any)
}

export function isI18nComponents(value: any): value is I18nComponent.Base {
  return isPlainObject(value) && isComponentNameType(value.type)
}

export function getI18nComponents(
  lang: I18n.Locale,
  i18Ns: I18n.I18nNS,
  values?: Record<string, any>
) {
  if (!values) {
    return []
  }
  const result = [] as I18nComponent.Base[]

  Object.keys(values).forEach((key) => {
    const value = values[key]
    if (isPlainObject(value)) {
      if (isComponentNameType(value.type)) {
        result.push(value)
      } else {
        if (workConfig.appEnv !== 'master') {
          clientLog.error(
            `locales/${lang}/${i18Ns}.json .${key} not I18nComponents! Register  component name in ../config/consts.ts `
          )
        }
      }
    }
  })

  return sortBy(result, 'sort')
}
