import { ContentBuilderConfig } from './ContentBuilderConfig';
import { slug } from 'github-slugger';

type GroupType<T> = {
  key: string;
  groupBy: keyof T;
  locale: string;
  slug: string;
  children?: T[];
  [key: string]: any;
};

export class BaseBuilder<ContentType extends Record<string, any>> {
  protected config: ContentBuilderConfig;

  constructor(config?: Partial<ContentBuilderConfig>) {
    this.config = new ContentBuilderConfig(config);
  }

  groupByField<T extends ContentType>(
    docs: T[],
    groupKey: keyof T
  ): GroupType<T>[] {
    const maps: Record<string, GroupType<T>> = {};
    for (const doc of docs) {
      const cates = doc[groupKey];
      if (!Array.isArray(cates) || !cates.length) {
        continue;
      }

      cates.forEach((key: string) => {
        if (!maps[key]) {
          maps[key] = {
            groupBy: groupKey,
            key: key,
            locale: this.config.lang,
            slug: slug(key),
            children: []
          };
        }

        maps[key].children?.push(doc);
      });
    }

    return Object.values(maps);
  }
}
