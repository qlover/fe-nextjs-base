/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useMemo } from 'react';

export type StackPathType = {
  id: number;
  key: string;

  name: string;
  path?: string;

  root?: boolean;
  last?: boolean;

  isSlug?: boolean;

  label?: string;
};

const slugReg = /^\[(.+)\]$/;

/**
 * 得到访问路径 pathname 栈
 *
 * TODO: 不支持多 slug 判断，只支持最后一层 slug 判断
 */
export function usePathStack() {
  const router = useRouter();
  const { pathname, asPath, query } = router;

  const stack: StackPathType[] = useMemo(() => {
    const pathnames = pathname.split('/');
    const result = pathnames.map((item, idx) => {
      const id = idx + 1;
      const result = {
        id,
        key: item || 'root',
        name: item || 'root',
        root: id === 1,
        last: id === pathnames.length,
      } as StackPathType;

      if (idx <= 1) {
        result.path = '/' + item;
        return result;
      }

      let prev = '';
      for (let i = 1; i < idx; i++) {
        prev += '/' + pathnames[i];
      }
      result.path = prev + '/' + item;

      // slug 判断
      const matched = item.match(slugReg);
      const slug = matched && matched[1];
      result.isSlug = !!(slug && query[slug]);

      if (result.last) {
        // @ts-expect-error
        result.name = result.isSlug ? query[slug] : asPath;

        result.path = asPath;
        return result;
      }

      return result;
    });

    return result;
  }, [asPath]);

  return { stack };
}
