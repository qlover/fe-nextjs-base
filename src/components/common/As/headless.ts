import { JSXElementConstructor, ReactElement, ReactNode } from 'react'

export declare namespace HeadlessAS {
  type ReactTag = keyof JSX.IntrinsicElements | JSXElementConstructor<any>
  let __: '1D45E01E-AF44-47C4-988A-19A94EBAF55C'

  type __ = typeof __

  type Expand<T> = T extends infer O
    ? {
        [K in keyof O]: O[K]
      }
    : never

  type PropsOf<TTag extends ReactTag> = TTag extends React.ElementType
    ? React.ComponentProps<TTag>
    : never

  type PropsWeControl = 'as' | 'children' | 'refName' | 'className'

  type CleanProps<
    TTag extends ReactTag,
    TOmitableProps extends PropertyKey = __
  > = TOmitableProps extends __
    ? Omit<PropsOf<TTag>, PropsWeControl>
    : Omit<PropsOf<TTag>, TOmitableProps | PropsWeControl>

  type OurProps<TTag extends ReactTag, TSlot> = {
    as?: TTag
    children?: ReactNode | ((bag: TSlot) => ReactElement)
    refName?: string
  }

  type HasProperty<T extends object, K extends PropertyKey> = T extends never
    ? never
    : K extends keyof T
    ? true
    : never

  type ClassNameOverride<
    TTag extends ReactTag,
    TSlot = {}
  > = true extends HasProperty<PropsOf<TTag>, 'className'>
    ? {
        className?: PropsOf<TTag>['className'] | ((bag: TSlot) => string)
      }
    : {}

  type Props<
    TTag extends ReactTag,
    TSlot = {},
    TOmitableProps extends PropertyKey = __
  > = CleanProps<TTag, TOmitableProps> &
    OurProps<TTag, TSlot> &
    ClassNameOverride<TTag, TSlot>

  type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never
  }

  type XOR<T, U> = T | U extends __
    ? never
    : T extends __
    ? U
    : U extends __
    ? T
    : T | U extends object
    ? (Without<T, U> & U) | (Without<U, T> & T)
    : T | U

  type ByComparator<T> = (keyof T & string) | ((a: T, b: T) => boolean)

  type EnsureArray<T> = T extends any[] ? T : Expand<T>[]
}
