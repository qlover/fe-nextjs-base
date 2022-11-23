import { useRouter } from 'next/router';
import useTranslation from './useTranslation';

export function getNsByRouter(route: string) {
  return route === '/' ? 'index' : (route.slice(1) as LocalApp.Locales);
}

/**
 * next useTranslation 扩展，可根据当前 router 直接获取 ns
 *
 * @param defaultNS
 * @returns
 */
export default function useTranslationRouter(
  defaultNS?: LocalApp.Locales | undefined
) {
  const router = useRouter();
  const i18Ns = defaultNS || getNsByRouter(router.route);
  const i18n = useTranslation(i18Ns);

  return { router, i18Ns, ...i18n };
}
