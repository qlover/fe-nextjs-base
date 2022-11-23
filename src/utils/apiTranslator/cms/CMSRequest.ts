import appConfig from '@/config/appConfig';
import { get, isArray, set, unset } from 'lodash';
import { parse as QSparse, stringify as QSstringify } from 'qs';
type ParamstersType = {
  sort?: string | Array<string>; //	Sort the response
  filters?: PlainObject<string>; //	Filter the response
  populate?: string | PlainObject<string>; //	Populate relations, components, or dynamic zones
  fields?: Array<any>; //	Select only specific fields to display
  pagination?: PlainObject; //	Page through entries
  publicationState?: 'live' | 'preview'; //	Select the Draft & Publish state Only accepts the following values:
  locale?: string | Array<any>; //	Select one ore multiple locales
};

type PropertyPath = any;

/**
 * 
 * 用来生成 cms querystring 
 * 
 * @see https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest/api-parameters.html
 * 
 * ```js
 * CMSRequest.create()
      .offset(1)
      .where('posts_slug', 'best-free-vpn-for-netflix')
      .fields(
        ['populate', 'cover'],
        ['id', 'name', 'alternativeText', 'caption', 'width', 'height']
      )
      .fields(
        ['populate', 'category'],
        ['id', 'cate_slug', 'label', 'updatedAt']
      )
      .fields(
        ['populate', 'recommends'],
        ['id', 'title', 'description', 'posts_slug', 'updatedAt', 'author']
      )
      .fields([
        'id',
        'title',
        'description',
        'seo_title',
        'seo_description',
        'seo_keywords',
        'content',
        'posts_slug',
        'updatedAt',
        'author',
      ])
      .toString()
  //  pagination[start]=0&pagination[limit]=1&filters[posts_slug]=best-free-vpn-for-netflix&populate[cover][fields][0]=id&populate[cover][fields][1]=name&populate[cover][fields][2]=alternativeText&populate[cover][fields][3]=caption&populate[cover][fields][4]=width&populate[cover][fields][5]=height&populate[category][fields][0]=id&populate[category][fields][1]=cate_slug&populate[category][fields][2]=label&populate[category][fields][3]=updatedAt&populate[recommends][fields][0]=id&populate[recommends][fields][1]=title&populate[recommends][fields][2]=description&populate[recommends][fields][3]=posts_slug&populate[recommends][fields][4]=updatedAt&populate[recommends][fields][5]=author&id[title][description][seo_title][seo_description][seo_keywords][content][posts_slug][updatedAt][author][fields]=%2A
 * ```
 */
export default class CMSRequest {
  query: ParamstersType;

  constructor(params?: any) {
    this.query = params || {};
  }

  static create(val?: ParamstersType | CMSRequest) {
    if (val instanceof CMSRequest) {
      return val;
    }
    return new CMSRequest(val);
  }

  /**
   * 设置语言
   * @param val
   */
  setLocale(val: string) {
    this.query.locale = val;
    return this;
  }

  fields(path?: PropertyPath, fields: string | string[] = '*') {
    if (path && fields) {
      return this.set(([] as string[]).concat(path).concat('fields'), fields);
    }
    if (!fields) {
      return this.set(['fields'], path);
    }
    return this.set(['fields'], fields);
  }
  // populate====
  populate(path?: PropertyPath, populates: string | string[] = '*') {
    if (path && populates) {
      return this.set(
        ([] as string[]).concat(path).concat('populate'),
        populates
      );
    }
    if (!populates) {
      return this.set(['populate'], path);
    }
    return this.set(['populate'], populates);
  }
  // sort =====
  sort(field: ([string, 'asc' | 'desc'] | string)[]) {
    const fields = field.map((f) =>
      isArray(f) ? f.join(':') : [f, 'desc'].join(':')
    );
    return this.set(['sort'], fields);
  }
  // where ====
  where = this.filters;
  filters(path: PropertyPath, val: any) {
    return this.set(['filters'].concat(path), val);
  }
  // pagination ======
  page(page: SameString = 1, pageSize: SameString = 25) {
    return this.del(['pagination', 'start'])
      .del(['pagination', 'limit'])
      .set(['pagination', 'page'], page)
      .set(['pagination', 'pageSize'], pageSize);
  }
  offset(limit = 25, start = 0) {
    return this.del(['pagination', 'page'])
      .del(['pagination', 'pageSize'])
      .set(['pagination', 'start'], start)
      .set(['pagination', 'limit'], limit);
  }

  withCount(val = true) {
    return this.set(['pagination', 'page'], val);
  }

  get(path: PropertyPath) {
    return get(this.query, path);
  }
  set(path: PropertyPath, value?: any) {
    set(this.query, path, value);
    return this;
  }
  del(path: PropertyPath) {
    unset(this.query, path);
    return this;
  }
  stringify() {
    return QSstringify(this.query, {
      encodeValuesOnly: appConfig.appEnv === 'local',
    });
  }
  parse(qs: string) {
    this.query = QSparse(qs);
    return this;
  }
  toString() {
    return this.stringify();
  }
  values() {
    return this.query;
  }
}
