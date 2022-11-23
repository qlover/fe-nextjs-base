import Img, { ImgProps } from '@/components/common/Img';
import domData from '@/utils/client/domData';
import classNames from 'classnames';
import React, { FC, ReactNode } from 'react';
import Arrange from '../Arrange';
import StringWithHTML from '../StringWithHtml';
import css from './index.module.less';

type FigureProps = React.HTMLAttributes<HTMLElement> &
  BaseComponent.WithChildren<{
    imgProps?: ImgProps;

    /**
     * 为了兼容上一版
     * @deprecated 可使用 `chlidren`
     */
    desc?: ReactNode;

    header?: ReactNode;
    contentHeader?: ReactNode;
    /**
     * 垂直模式, 主要单纯使用图片上文字下布局
     *
     * 支持两种布局，一种普通水平排列，小尺寸会显示成垂直排列
     *
     * 第二种就是垂直排列，不会受屏幕大小影响
     *
     */
    layout?: 'vertical' | 'horizontal';

    /**
     * 小尺寸是图片是否在上方, 默认 true
     */
    topCover?: boolean;
  }>;

/**
 * 扩展 figure 元素
 * @returns
 */
const Figure: FC<FigureProps> = ({
  children,
  imgProps,
  desc,
  layout = 'horizontal',
  className,
  contentHeader,
  topCover = true,
  header,
  ...restProps
}) => {
  return (
    <Arrange
      {...restProps}
      {...domData.compoent('Figure')}
      miniSingle
      as="figure"
      className={classNames(
        css['layout-' + layout],
        topCover ? [css['topCover']] : '',
        className
      )}
    >
      {header ? (
        <Arrange.Cell className="figure-head">{header}</Arrange.Cell>
      ) : null}

      <Arrange.Cell className="figure-content">
        {contentHeader ? (
          <div className="figure-content-head">{contentHeader}</div>
        ) : null}
        <StringWithHTML value={desc || children} />
      </Arrange.Cell>

      {imgProps ? (
        <Arrange.Cell className="figure-cover">
          <Img width={600} height={400} {...imgProps} />
        </Arrange.Cell>
      ) : null}
    </Arrange>
  );
};

export default Figure;
