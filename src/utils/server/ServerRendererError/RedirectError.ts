import type { Redirect } from 'next/types'
import ServerRendererError from './ServerRendererError'

export default class RedirectError extends ServerRendererError {
  _app_redirect
  constructor(
    redircet?:
      | { redirect: Redirect; revalidate?: number | boolean }
      | { notFound: true; revalidate?: number | boolean }
  ) {
    super({ code: 302 })

    this._app_redirect = redircet
  }

  redirect() {
    return this._app_redirect || super.redirect()
  }
}
