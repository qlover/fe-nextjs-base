import ServerRendererError from './ServerRendererError'

export default class ServerError extends ServerRendererError {
  constructor(message?: any) {
    super({ code: 500, message })
  }
}
