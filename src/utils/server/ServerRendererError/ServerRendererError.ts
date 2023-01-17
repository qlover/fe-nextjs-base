import { createRedirect, RedirectProps } from '@/utils/common/Redirect'
import type { Redirect } from 'next'

interface ServerRendererErrorInterface {
  redirect(): { redirect: Redirect; revalidate?: number | boolean }
}

export type ServerRendererErrorProps = RedirectProps & {
  revalidate?: number | boolean

  message?: string
  options?: ErrorOptions
}

export default class ServerRendererError
  extends Error
  implements ServerRendererErrorInterface
{
  props: ServerRendererErrorProps

  constructor(props: ServerRendererErrorProps) {
    super(props.message, props.options)
    this.props = props
  }

  redirect(props?: Partial<ServerRendererErrorProps>): {
    redirect: Redirect
    revalidate?: number | boolean | undefined
  } {
    const { message, options, revalidate, ...crprops } = this.props

    const redirect = createRedirect({ ...crprops, ...props })

    if (typeof revalidate === 'boolean' || typeof revalidate === 'number') {
      return { redirect, revalidate }
    }

    return { redirect }
  }
}
