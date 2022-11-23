import { CmsResponseType } from '@/service/cms';
import { PaginationProps } from 'antd';
import { get, has, isArray, isPlainObject } from 'lodash';
import { isNotEmptyArray, isSameNull } from 'maroonlis-utils';
import FlatResponse from './FlatResponse';
type PopulateType = string;
export type DataElement = {
  id: SameString;
  attributes?: any;
};
export type DataElementGroup = DataElement[] | DataElement;
export type WithDataType<T> = {
  data?: T;
};

function isDataElement(val: any): val is DataElement {
  return isPlainObject(val) && has(val, 'id') && has(val, 'attributes');
}

/**
 * 用来处理 cms 接口数据
 */
export default class CMSApi {
  value: CMS.Response.DataType;
  flatObj: FlatResponse;
  /**
   * 接受一个 axios 响应格式
   * @param value
   */
  constructor(value?: CmsResponseType) {
    this.flatObj = new FlatResponse();

    this.value = value
      ? value.data
      : {
          data: null,
        };
  }

  /**
   * 单独设置源数据
   * @param value
   * @returns
   */
  setValue(value: CMS.Response.DataType) {
    this.value = value;
    return this;
  }

  getData() {
    return get(this.value, ['data']);
  }
  getMeta(key?: 'pagination') {
    const path = ['meta'];

    key && path.push(key);

    return get(this.value, path);
  }

  /**
   * 判断是否有数据, 包括 `null|undefined|[]`
   * @returns
   */
  isEmpty() {
    const data = this.getData();
    return isSameNull(data) || (isArray(data) && !data.length);
  }

  getPagination(): PaginationProps {
    const pagination = this.getMeta('pagination') as CMS.Response.PageInfo;
    return {
      total: pagination.total,
      current: pagination.page,
      pageSize: pagination.pageSize,
    };
  }

  flat<T = any>(): T {
    const sourceData = this.getData();

    let result;

    this.flatObj.begin();

    result = this.flatObj.flatInner(sourceData);

    this.flatObj.end();

    return result;
  }

  pick(key: string) {
    const source = this.flat();
    if (isPlainObject(source)) {
      return source[key];
    } else if (isNotEmptyArray(source)) {
      return source.map((i) => i[key]);
    }
    return source;
  }
}
