import Macos from '@/assets/svgIcon/macos.svg';
import Icon from '@ant-design/icons';
import React from 'react';
import { IconSvgBaseProps } from '.';

const IconSvgMacos = React.forwardRef<HTMLSpanElement, IconSvgBaseProps>(
  (props, ref) => <Icon {...props} ref={ref} component={Macos} />
);

IconSvgMacos.displayName = 'IconSvgMacos';

export default IconSvgMacos;
