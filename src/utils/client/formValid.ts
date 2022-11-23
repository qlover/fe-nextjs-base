export function isEmail(val?: string) {
  return !!(
    val &&
    /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(val)
  );
}

/**
 * 密码长度 8-16位
 * @param str
 * @returns
 */
export function isPassowrdLength(str?: string) {
  return !!(str && str.length >= 8 && str.length <= 16);
}

/**
 * 包含字母的字符串
 * @param str
 * @returns
 */
export function hasLetterString(str: string) {
  return /(?=.*[a-zA-Z]).+/.test(str);
}
/**
 * 包含数字的字符串
 * @param str
 * @returns
 */
export function hasNumberString(str: string) {
  return /(?=.*[0-9]).+/.test(str);
}

export function isPassword(str: string) {
  return ShellPasswordRE().test(str);
}

export const ShellPasswordRE = (min = 8, max = 16) =>
  new RegExp(`(?=.*[0-9])(?=.*[a-zA-Z]).{${min},${max}}`);
