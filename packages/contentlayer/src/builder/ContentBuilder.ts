import { ParseFiledsType } from './../type';
import { isArray } from 'lodash';
import { slug } from 'github-slugger';

export interface ContentBuilderConfig<T extends ParseFiledsType> {
  locale?: string;
  allDocs?: T[];
}

type GroupType<T> = {
  key: string;
  groupBy: string;
  locale: string;
  slug: string;
  children?: T[];
  [key: string]: any;
};

export class ContentBuilder<ContentType extends ParseFiledsType> {
  protected contentList: ContentType[];
  constructor(protected config?: ContentBuilderConfig<ContentType>) {
    this.contentList =
      config?.allDocs?.filter((item) => item.locale === config.locale) || [];
  }

  getContentList(): ContentType[] {
    return this.contentList;
  }

  groupBy<T extends ContentType>(docs: T[], groupKey: keyof T) {
    const maps: Record<string, GroupType<T>> = {};
    for (const doc of docs) {
      const cates = doc[groupKey];
      if (!isArray(cates) || !cates.length) {
        continue;
      }

      cates.forEach((key: string) => {
        const target: GroupType<T> = (maps[key] = maps[key] || {
          groupBy: groupKey,
          key: key,
          locale: this.config?.locale,
          slug: slug(key),
          children: []
        });

        target.children?.push(doc);
      });
    }

    return Object.values(maps);
  }
}
