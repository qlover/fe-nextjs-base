import Chrome from '@/assets/svgIcon/chrome.svg';
import Icon from '@ant-design/icons';
import React from 'react';
import { IconSvgBaseProps } from '.';

const IconSvgChrome = React.forwardRef<HTMLSpanElement, IconSvgBaseProps>(
  (props, ref) => <Icon {...props} ref={ref} component={Chrome} />
);

IconSvgChrome.displayName = 'IconSvgChrome';

export default IconSvgChrome;
