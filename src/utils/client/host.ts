import appConfig from '@/config/appConfig';
import { parse, stringify } from 'qs';

export function getWebDomain() {
  return (
    document.location.protocol +
    '//' +
    document.domain +
    (document.location.port ? ':' + document.location.port : '')
  );
}

export function isMobile() {
  return navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
}

/**
 * 连接路径
 * @param host
 * @param path
 * @returns
 */
export function concatURL(host: string, path: string) {
  if (host === '' || path === '') {
    return '';
  }
  const lastHost = host[host.length - 1];
  const firstPath = path[0];

  if (lastHost === '/' && firstPath === '/') {
    return host.slice(0, -1) + path;
  }

  if (lastHost !== '/' && firstPath !== '/') {
    return host + '/' + path;
  }

  return host + path;
}

/**
 * 解析 url 中的参数
 * @param url
 * @returns
 */
export function parseURLSearchParams(url: string) {
  if (url.includes('?')) {
    return parse(url.split('?')[1]);
  }
  return {};
}

/**
 * 打开新窗口，并动态创建 html
 * @param html
 */
export function openWindowWithHTML(html: string) {
  // window.location.href = 'about:blank';
  // document.write(html);

  // let newWindow = window.open('about:blank');
  // if (newWindow) {
  document.write(html);
  // focus();
  // //如果要关闭这个页面
  // newWindow.close();
  // newWindow = null;
  // }
}

export function openPopupWindow(props: LocalApp.PopupWindowProps = {}) {
  const { url = 'about:blank', name = 'nw', ...featuresObj } = props;

  const featuresStr = stringify(featuresObj).replace(/&/g, ',');

  console.log('featuresStr', featuresStr);

  let windowObjectReference = window.open(url, name, featuresStr);

  return windowObjectReference;
}

export function openURL(url: string, args?: any) {
  window.location.href = url;
}
function GenNonDuplicateID(randomLength?: number) {
  return Number(
    Math.random()
      .toString()
      .substring(2, randomLength ? randomLength + 2 : void 0) + Date.now()
  ).toString(36);
}

export function fillHrefWithLocale(
  href: string,
  locale = appConfig.lang as LocalApp.Lang
) {
  if (appConfig.lang !== locale) {
    return concatURL(appConfig.siteURL, concatURL(locale, href));
  }
  return concatURL(appConfig.siteURL, href);
}
