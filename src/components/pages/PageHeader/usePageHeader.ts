import useCacheState from '@/hooks/common/useCacheState'
import { useCallback, useRef } from 'react'

type PageHeaderState = {
  openDrawer: boolean
  currentNavKey: string
  scrolled: boolean
}

export default function usePageHeader() {
  const headerRef = useRef<HTMLHeadElement>(null)

  const [innserState, setInnerState] = useCacheState<PageHeaderState>({
    openDrawer: false,
    currentNavKey: '',
    scrolled: false
  })

  const onChangeOpenDrawer = useCallback((open: boolean) => {
    setInnerState({ openDrawer: open })
  }, [])

  return {
    headerRef,
    ...innserState,
    onChangeOpenDrawer
  }
}
