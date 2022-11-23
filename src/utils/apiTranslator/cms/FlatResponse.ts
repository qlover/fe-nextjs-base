import { get, has, isPlainObject } from 'lodash';
import { isNotEmptyArray } from 'maroonlis-utils';
import { DataElement, DataElementGroup, WithDataType } from './CMSApi';

/**
 * 扁平化响应数据
 */
export default class FlatResponse {
  level = 0;
  static MAX_LEVEL = 5;
  static isWithData<T = any>(val: any): val is WithDataType<T> {
    return has(val, 'data');
  }
  begin(level = 0) {
    this.level = level;
  }
  end() {
    this.level = 0;
  }
  /**
   * 递归
   * @param sourceData
   * @returns
   */
  flatInner(
    sourceData: { data: DataElementGroup } | DataElementGroup,
    level = 1
  ) {
    if (level > FlatResponse.MAX_LEVEL) {
      this.end();
      return sourceData;
    }

    // 1. 没有被 data 包裹
    let flatData = sourceData;

    if (FlatResponse.isWithData(sourceData)) {
      // 2. 被 data 包裹
      flatData = get(sourceData, 'data');
    }

    let result: any;
    if (isPlainObject(flatData)) {
      result = this.pullWithObject(flatData as any);

      this.flatObject(result, level + 1);
    } else if (isNotEmptyArray(flatData)) {
      result = this.pullWithArray(flatData);

      (result as any[]).forEach((item) => {
        item = this.flatObject(item, level + 1);
      });
    }

    return result;
  }

  /**
   * 扁平对象
   * @param source
   * @returns
   */
  flatObject(source: any, level = 0) {
    // const result = { ...source };

    // FIXME: 可以指定递归字段
    // 递归所有可能包含的 DataElementGroup 类型
    Object.keys(source).forEach((key) => {
      const val = source[key];
      if (FlatResponse.isWithData(val)) {
        // console.log('flatObject key', key);
        source[key] = this.flatInner(val as any, level);
      }
    });

    return source;
  }

  /**
   * 将对象多个 DataElement 去掉 attributes 属性
   * @param source
   * @returns
   */
  pullWithArray(source: { data: DataElement[] } | DataElement[]) {
    let resultData = source as DataElement[];
    if (FlatResponse.isWithData(source)) {
      resultData = get(source, 'data', []);
    }

    const result = resultData.map((item, index) => {
      return {
        ...this.pullWithObject(item),
        _flat_index: index,
      };
    });

    return result;
  }

  /**
   * 将对象单个 DataElement 去掉 attributes 属性
   * @param source
   * @returns
   */
  pullWithObject(source: { data: DataElement } | DataElement) {
    let resultData = source as DataElement;
    if (FlatResponse.isWithData(source)) {
      resultData = get(source, 'data', {} as DataElement);
    }

    const result = {
      id: resultData.id,
      ...resultData.attributes,
    };

    return result;
  }
}
