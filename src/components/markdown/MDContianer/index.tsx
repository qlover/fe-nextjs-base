import { ComponentPropsWithoutRef, ElementType } from 'react';
import ReactMarkdown, { Options } from 'react-markdown';
import { ReactMarkdownProps } from 'react-markdown/lib/ast-to-react';
// 为了解析支持 table
import remarkGfm from 'remark-gfm';

type MDContianerProps = Options & {
  children: string;
  withTable?: boolean;
};

export type MDChildProps<TagName extends ElementType> =
  ComponentPropsWithoutRef<TagName> & ReactMarkdownProps;

const remarkPlugins = [remarkGfm];

/**
 * md 文本容器
 * @returns
 */
export default function MDContianer({
  children,
  ...options
}: MDContianerProps) {
  // const Plugin = useMemo(() => {
  //   return {};
  // }, [placeholder]);

  return (
    <ReactMarkdown
      remarkPlugins={remarkPlugins}
      // components={Plugin}
      {...options}
    >
      {children}
    </ReactMarkdown>
  );
}
