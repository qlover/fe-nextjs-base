import { animate, easeOut } from 'popmotion';

/**
 * 滚动到指定元素
 * @param element
 * @param offsetDiff
 * @returns
 */
export function scrollToElement(element: HTMLElement, offsetDiff = 0) {
  if (!element) {
    return false;
  }
  return animate({
    from: window.scrollY,
    to: element.offsetTop,
    type: 'keyframes',
    duration: 400,
    ease: easeOut,
    onUpdate: (latest) => window.scrollTo({ top: latest + offsetDiff }),
  });
}
