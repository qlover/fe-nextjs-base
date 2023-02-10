import Expand from '@/assets/svgIcon/expand.svg';
import Icon from '@ant-design/icons';
import React from 'react';
import { IconSvgBaseProps } from '.';

const IconSvgExpand = React.forwardRef<HTMLSpanElement, IconSvgBaseProps>(
  (props, ref) => <Icon {...props} ref={ref} component={Expand} />
);

IconSvgExpand.displayName = 'IconSvgExpand';

export default IconSvgExpand;
