import domData from '@/utils/client/domData';
import classNames from 'classnames';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import css from './index.module.less';

export default function ScrollContainer({
  className,
  style,
  children,
}: BaseComponent.UIChildren<{}>) {
  return (
    <SimpleBar
      {...domData.compoent('ScrollContainer')}
      className={classNames(css['container'], 'ScrollContainer', className)}
      style={style}
      autoHide={false}
    >
      {children}
    </SimpleBar>
  );
}
