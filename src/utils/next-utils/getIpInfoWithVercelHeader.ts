import { IncomingHttpHeaders } from 'http';
import { isString } from 'lodash';

export function getIpInfoWithVercelHeader(headers: IncomingHttpHeaders) {
  const vercelIp = headers['cf-connecting-ip'] || headers['x-real-ip'];
  return {
    ip: isString(vercelIp) ? decodeURI(vercelIp) : '',
    country: headers['x-vercel-ip-country'],
    countryRegion: headers['x-vercel-ip-country-region'],
    city: headers['x-vercel-ip-city'],
    latitude: headers['x-vercel-ip-latitude'],
    longitude: headers['x-vercel-ip-longitude'],
    timezone: headers['x-vercel-ip-timezone'],
  };
}
