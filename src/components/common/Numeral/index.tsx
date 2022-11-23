import { isSameNull } from 'maroonlis-utils';
import { FC } from 'react';

type NumeralProps = BaseComponent.UI & {
  value?: number | string;
  defaultValue?: number | string;
  /**
   * 小数点，默认 2位小数
   */
  dit?: number;
  format?: boolean;
};

export function formatNumber(num: number | string, dit = 2) {
  return (+num).toFixed(dit);
}
/**
 * 用来格式显示数字组件
 * @param param0
 * @returns
 */
const Numeral: FC<NumeralProps> = ({
  className,
  value,
  defaultValue = 0,
  dit = 2,
  format = true,
}) => {
  return (
    <span className={className}>
      {format
        ? formatNumber(isSameNull(value) ? defaultValue : value, dit)
        : value}
    </span>
  );
};

export default Numeral;
