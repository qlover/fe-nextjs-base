import { isFunction } from 'lodash';

type ReplacerFunc = (text: string, index: number) => any;

const wrapperRe = /(\{.*?\})/;
const noWrapperRe = /\{(.*?)\}/;
const numberPrefix = /(\d):(.+)/;

function replacer(
  text: any,
  index: number,
  loopIndex: number,
  replaces?: ReplacerFunc | ReplacerFunc[]
) {
  if (isFunction(replaces)) {
    return replaces(text, loopIndex);
  }

  if (Array.isArray(replaces)) {
    if (isFunction(replaces[index])) {
      return replaces[index](text, loopIndex);
    }
  }
  return text;
}

/**
 * 用来替换国际化中有模板的文字
 *
 * ```
 * const i18n = 'By browsing this website, you consent to our - {Privacy Policy}';
 * const result = i18nReplacer(i18n, text => <strong key={text}>{text}</strong>);
 * // ['By browsing this website, you consent to our - ', {…} as React.ReactNode]
 * ```
 *
 * ```
 * const i18n = 'By submitting, you agree to our {1:Privacy Policy} And {2:Terms of Service}';
 * const result = i18nReplacer(t('pricing_by_submitting'), [
 *   (text) => (
 *     <A key={text} className="text-primary" href="/privacy">
 *       Privacy Policy
 *     </A>
 *   ),
 *   (text) => (
 *     <A key={text} className="text-primary" href="/terms">
 *       Terms Of Service
 *     </A>
 *   ),
 * ]);
 * // ['By submitting, you agree to our ', {…} as React.ReactNode, ' And ', {…} as React.ReactNode]
 * ```
 *
 * @param i18nstring
 * @param replaces
 * @returns
 */
export default function i18nReplacer(
  i18nstring: string,
  replaces?: ReplacerFunc | ReplacerFunc[]
) {
  return i18nstring
    .split(wrapperRe)
    .filter(Boolean)
    .map((keyword, loopIndx) => {
      const text = keyword.match(noWrapperRe)?.[1];
      if (text) {
        const number = text.match(numberPrefix);
        if (number && number[1]) {
          return replacer(
            number[2],
            Math.max(0, +number[1] - 1),
            loopIndx,
            replaces
          );
        } else {
          return replacer(text, 0, loopIndx, replaces);
        }
      }
      return keyword;
    });
}
