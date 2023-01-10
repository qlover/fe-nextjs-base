import ServerRendererError from './ServerRendererError'

export default class NotFoundError extends ServerRendererError {
  constructor() {
    super({ code: 404, message: 'Page Not Found' })
  }
}
