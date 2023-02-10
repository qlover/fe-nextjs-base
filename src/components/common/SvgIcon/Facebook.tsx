import Facebook from '@/assets/svgIcon/facebook.svg';
import Icon from '@ant-design/icons';
import React from 'react';
import { IconSvgBaseProps } from '.';

const IconSvgFacebook = React.forwardRef<HTMLSpanElement, IconSvgBaseProps>(
  (props, ref) => <Icon {...props} ref={ref} component={Facebook} />
);

IconSvgFacebook.displayName = 'IconSvgFacebook';

export default IconSvgFacebook;
