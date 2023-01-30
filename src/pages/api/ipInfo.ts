import workConfig from '@/config/workConfig'
import { isString } from 'lodash'
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {}
const emptyIpInfo = () => ({
  ipv4: '',
  ipv6: '',

  isp: '',

  country: '',
  city: '',
  region: '',

  /** 纬度 */
  lat: 0,
  /** 经度 */
  lng: 0,
  /** 是否是国外 */
  overseas: false
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { headers, query } = req
  const queryIp = isString(query['ip']) ? query['ip'] : ''

  if (workConfig.appEnv !== 'master') {
    res.setHeader('Access-Control-Allow-Origin', '*')
  }

  let vercelIpInfo,
    ipInfoIo,
    ipInfoData = emptyIpInfo()

  try {
    // 查询 ipinfo.io
    ipInfoIo = await fetch(`https://ipinfo.io`, {
      headers: {
        Host: 'ipinfo.io',
        'User-Agent': 'curl/7.68.0',
        Accept: '*/*',
        'accept-language': headers['accept-language'] || ''
      }
    }).then((res) => res.json())

    if (ipInfoIo) {
      // copy 属性
      ipInfoData.country = ipInfoIo.country
      ipInfoData.region = ipInfoIo.country
      ipInfoData.city = ipInfoIo.city
      const loc = ipInfoIo.loc.split(',')
      ipInfoData.lat = +loc[0]
      ipInfoData.lng = +loc[1]
    }
  } catch {}

  res.status(200).json({
    code: 200,
    data: { vercelIpInfo, headers, ipInfoIo, ipInfoData }
  })
}
