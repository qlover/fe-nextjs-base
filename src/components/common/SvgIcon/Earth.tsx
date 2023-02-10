import Earth from '@/assets/svgIcon/earth.svg';
import Icon from '@ant-design/icons';
import React from 'react';
import { IconSvgBaseProps } from '.';

const IconSvgEarth = React.forwardRef<HTMLSpanElement, IconSvgBaseProps>(
  (props, ref) => <Icon {...props} ref={ref} component={Earth} />
);

IconSvgEarth.displayName = 'IconSvgEarth';

export default IconSvgEarth;
