import { AxiosResponse } from 'axios'
import request from '.'

export function fetchIpInfo() {
  return request<AxiosResponse<AxiosResponse<any>>>({
    url: '/ipInfo',
    method: 'GET'
  })
}
