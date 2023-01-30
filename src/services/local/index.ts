import workConfig from '@/config/workConfig'
import axios, { AxiosRequestConfig } from 'axios'
import { concatPath, serviceManager } from 'maroonlis-utils'

export * from './system'

export const localAxios = axios.create({
  baseURL: concatPath(workConfig.siteURL, '/api')
})

export const localService = serviceManager<Partial<AxiosRequestConfig>>({
  instaner: localAxios.request,
  mocker(data) {
    return {
      status: 200,
      statusText: 'ok',
      headers: {},
      config: {},
      data: {
        code: 200,
        data,
        message: 'ok'
      }
    }
  }
})

export default localService.request
