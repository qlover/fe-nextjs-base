import useCacheState from '@/hooks/useCacheState';
import useTranslation from '@/hooks/useTranslation';
import classNames from 'classnames';
import { useRef } from 'react';
import css from './index.module.less';

export type PageHeaderProps = {
  wrapperClassName?: string;
};

/**
 * TODO: fixed and stricy
 * @param param0
 * @returns
 */
function PageHeader({ wrapperClassName }: PageHeaderProps) {
  const { t: commonT } = useTranslation('common');
  const headerRef = useRef<HTMLHeadElement>(null);
  const [innserState, setInnerState] = useCacheState({
    openDrawer: false,
    drawerType: 'nav' as 'nav' | 'lang',
    currentNavKey: '',
    scrolled: false,
  });

  return (
    <header
      ref={headerRef}
      className={classNames(css['page-haeder'], wrapperClassName, {
        [css['scrolled']]: innserState.scrolled,
      })}
    >
      header
    </header>
  );
}

export default PageHeader;
