import { UrlObject } from 'url';

/**
 * 用来统一一些渲染值，比如图片属性定义，文本属性等
 */
declare namespace RenderValue {
  /**
   * 图片属性
   */
  type Image = Pick<JSX.IntrinsicElements['img'], 'src' | 'alt' | 'title'>;

  /**
   * 链接属性
   */
  type BaseLink = {
    name?: string;
    title?: string;
  };

  type Link = Pick<JSX.IntrinsicElements['a'], 'href' | 'target' | 'hidden'> &
    BaseLink;
  /**
   * 连接属性，因为分 client 和 server, client 可能是动态
   */
  type Href = string | UrlObject;
  type HrefType = Href | (() => Href);

  /**
   * 选项值
   */
  type OptionType<V = any> = {
    label?: string;
    value?: V;
    key?: string;
    [key: string]: any;
  };

  type ImgValue = {
    src: string;
    title: string;
    alt: string;
  };

  type RvValueType = {
    key: string;
    title: string;
    href: HrefType;
    src?: string;

    /**
     * 是否隐藏
     */
    hidden?: boolean;
    children?: RvValueType[];

    [key: string]: any;
  };
  /**
   * _rvdata.json 中类型
   */
  type RvDataType = {
    [key: string]: any | undefined;
  };
}

export = RenderValue;
export as namespace RenderValue;
