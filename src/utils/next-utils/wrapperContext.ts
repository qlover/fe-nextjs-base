import { GetServerSidePropsContext } from 'next';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';

export default function wrapperContext(
  ctx: GetServerSidePropsContext<any, any>
) {
  const query = parseQSForString(ctx.query);

  return { query };
}

export function parseQSForString(qs: NextParsedUrlQuery): NodeJS.Dict<string> {
  const result: Record<string, string> = {};
  Object.keys(qs).forEach((key) => {
    const value = qs[key];
    if (value && !Array.isArray(value)) {
      result[key] = value;
    }
  });
  return result;
}
