/**
 * 获取 `.env` 变量
 * @param {keyof NodeJS.ProcessEnv} name
 * @returns
 */
export default function nextEnv(
  name: keyof NodeJS.ProcessEnv,
  defaultValue = ''
) {
  if (name.toString().startsWith('NEXT_PUBLIC_')) {
    return process.env[name] || defaultValue;
  }
  return process.env['NEXT_PUBLIC_' + name] || defaultValue;
}

export function isBrower() {
  return typeof window !== 'undefined';
}
export function isServer() {
  return typeof window === 'undefined';
}

/**
 * 安全的获取 window 对象
 * @returns
 */
export function BOM() {
  try {
    if (isBrower()) {
      return window;
    }
  } catch {
    return;
  }
}
