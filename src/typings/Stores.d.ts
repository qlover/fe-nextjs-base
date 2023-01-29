declare namespace Stores {
  type AuthState = {
    authState?: boolean
    authUser?: {
      name?: string
      id?: number
      /**
       * 金额
       */
      money?: number
    }
  }
}
