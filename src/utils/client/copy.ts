import copyText from 'copy-to-clipboard';
import { asyncSleep } from 'maroonlis-utils';

export default async function copy(text: number | string) {
  await asyncSleep();
  const res = copyText('' + text, {
    debug: process.env.NODE_ENV !== 'production',
  });
  if (!res) {
    return Promise.reject();
  }
  return res;
}
