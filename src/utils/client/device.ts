import UAParser from 'ua-parser-js';

export function getDeviceType(): 'other' | 'ios' | 'android' {
  const parser = new UAParser();
  const { name = '' } = parser.getOS();

  if (!name) {
    return 'other';
  }

  if (['Android', 'iOS'].includes(name)) {
    return name.toLowerCase() as 'ios' | 'android';
  }
  return 'other';
}

export function getOSAndBrowser() {
  let parser = new UAParser();
  return [parser.getOS().name, parser.getBrowser().name];
}
