import { DependencyList, EffectCallback, useEffect, useRef } from 'react'

/**
 * 由于 next 推荐使用严格模式, 在严格模式下，会导致 effect 初始化执行两次
 *
 * 可在开启 `reactStrictMode` 替换 ` useEffect`
 */
export default function useStrictEffect(
  effect: EffectCallback,
  deps: DependencyList = []
) {
  const effectRef = useRef(0)
  const returnRef = useRef<ReturnType<typeof effect>>()

  useEffect(() => {
    if (effectRef.current) {
      returnRef.current = effect()
    }

    if (!effectRef.current) {
      effectRef.current++
    }

    return () => {
      returnRef.current?.()
    }
  }, deps)
}
