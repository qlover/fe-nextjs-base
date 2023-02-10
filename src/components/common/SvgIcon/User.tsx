import User from '@/assets/svgIcon/user.svg';
import Icon from '@ant-design/icons';
import React from 'react';
import { IconSvgBaseProps } from '.';

const IconSvgUser = React.forwardRef<HTMLSpanElement, IconSvgBaseProps>(
  (props, ref) => <Icon {...props} ref={ref} component={User} />
);

IconSvgUser.displayName = 'IconSvgUser';

export default IconSvgUser;
