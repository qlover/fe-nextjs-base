import iconFontJson from '@/config/share/iconFont.json';
import { createFromIconfontCN } from '@ant-design/icons';

export type IconFontType = 'icon-windows' | 'icon-android' | 'icon-29mac' | 'icon-expand' | 'icon-close' | 'icon-menu' | 'icon-shuizhu' | 'icon-mac';

/**
 * 借用 antd createFromIconfontCN 创建的 iconfont.cn 上的字体图标
 */
const IconFont = createFromIconfontCN<IconFontType>({
  scriptUrl: iconFontJson.js,
});

export default IconFont;
