import Twitter from '@/assets/svgIcon/twitter.svg';
import Icon from '@ant-design/icons';
import React from 'react';
import { IconSvgBaseProps } from '.';

const IconSvgTwitter = React.forwardRef<HTMLSpanElement, IconSvgBaseProps>(
  (props, ref) => <Icon {...props} ref={ref} component={Twitter} />
);

IconSvgTwitter.displayName = 'IconSvgTwitter';

export default IconSvgTwitter;
