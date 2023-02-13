import { logger } from '@/utils/common'
import { isNumber, isPlainObject, isString, sortBy } from 'lodash'
import { I18nComponentsNames, LocalJsonComponentKey } from '../config/consts'

function isComponentNameType(
  value: unknown
): value is I18nComponent.ComponentNameType {
  return isString(value) && I18nComponentsNames.includes(value as any)
}

function isKey(val: any): val is string | number {
  return isString(val) || isNumber(val)
}

/**
 * 是否是 I18nComponent.Base 类型
 *
 * @param value
 * @returns
 */
export function isI18nComponentBaseType(
  value: any
): value is I18nComponent.Base {
  return isPlainObject(value) && isKey(value.key) && isString(value.type)
}

function isI18nComponentNameKey(value: string) {
  return value.startsWith(LocalJsonComponentKey)
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

  Object.keys(values)
    .filter(isI18nComponentNameKey)
    .forEach((key) => {
      const value = values[key]
      if (isI18nComponentBaseType(value)) {
        if (isComponentNameType(value.type)) {
          result.push(value)
        } else {
          logger.error(
            `"${value.type}" component not found! Register component in config/consts.ts`
          )
        }
      } else {
        logger.error(`${key} not a I18nComponent.Base type!`)
      }
    })

  return sortBy(result, 'sort')
}
