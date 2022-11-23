/**
 * 该项目本地的一些类型
 */
declare namespace LocalApp {
  type AppEnv = 'fork:test' | 'test' | 'master' | 'local';
  type AppDeployment = 'local' | 'vercel';
  type DeviceType = 'android' | 'ios' | 'windows' | 'other';
  type Lang = 'en' | 'zh' | 'ru';

  /**
   * - 客户端渲染 BSR (Broswer Side Render)
   * - 静态页面生成 SSG (Static Site Generation)
   * - 服务端渲染 SSR (Server Side Render)
   */
  type NextRenderType = 'BSR' | 'SSR' | 'SSG';

  /**
   * 所有页面路由组合注册
   */
  type PageRouteType = '/';

  type Locales = '_rvdata' | 'common' | 'index';

  /**
   * next page local props
   */
  type PageProps<Route = '*'> = {
    /**
     * 语言环境
     */
    __lang: Lang;

    /**
     * 本地数据因为从 i18n.json 过来，next 会将数据从 __namespace 带过来
     */
    __namespaces: Record<Locales, any>;
  };

  type PopupWindowProps = {
    /**
     * 窗口名字
     */
    name?: string;

    /**
     * url
     */
    url?: string;

    /**
     * 是否使用剧院模式显示窗口。默认为 no。
     */
    channelmode?: 'yes' | 'no' | 1 | 0;
    /**
     * 是否添加目录按钮。默认为 yes。
     */
    directories?: 'yes' | 'no' | 1 | 0;
    /**
     * 是否使用全屏模式显示浏览器。默认是 no。处于全屏模式的窗口必须同时处于剧院模式。
     */
    fullscreen?: 'yes' | 'no' | 1 | 0;
    /**
     * 窗口文档显示区的高度。以像素计。
     */
    height?: number;
    /**
     * 窗口的 x 坐标。以像素计。
     */
    left?: number;
    /**
     * 是否显示地址字段。默认是 yes。
     */
    location?: 'yes' | 'no' | 1 | 0;
    /**
     * 是否显示菜单栏。默认是 yes。
     */
    menubar?: 'yes' | 'no' | 1 | 0;
    /**
     * 窗口是否可调节尺寸。默认是 yes。
     */
    resizable?: 'yes' | 'no' | 1 | 0;
    /**
     * 是否显示滚动条。默认是 yes。
     */
    scrollbars?: 'yes' | 'no' | 1 | 0;
    /**
     * 是否添加状态栏。默认是 yes。
     */
    status?: 'yes' | 'no' | 1 | 0;
    /**
     * 是否显示标题栏。默认是 yes。
     */
    titlebar?: 'yes' | 'no' | 1 | 0;
    /**
     * 是否显示浏览器的工具栏。默认是 yes。
     */
    toolbar?: 'yes' | 'no' | 1 | 0;
    /**
     * 窗口的 y 坐标。
     */
    top?: number;
    /**
     * 窗口的文档显示区的宽度。以像素计。
     */
    width?: number;
  };
}

// export = LocalApp;
// export as namespace LocalApp;
