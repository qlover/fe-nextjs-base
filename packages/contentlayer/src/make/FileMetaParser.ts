import { slug } from 'github-slugger';
import { MetaDataResult } from '../type';

const orderReg = /^(\d+)?-/;

function createLocalReg(locales: string[]) {
  return new RegExp(`\\.(${locales.join('|')})`);
}

export class FileMetaParser {
  static defaultLocale: string = '';
  static locales: string[] = [];

  /**
   *
   * @param {string} flattenedPath
   */
  static getFileOrder(flattenedPath: string) {
    const filename = flattenedPath.split('/').pop() || '';
    const matched = filename ? orderReg.exec(filename) : [];
    return matched ? +matched[1] : filename.includes('index') ? 5 : 10;
  }

  /**
   *
   * @param {string} flattenedPath
   */
  static getFileLocale(flattenedPath: string) {
    if (FileMetaParser.locales && FileMetaParser.locales.length) {
      const localUrlReg = createLocalReg(FileMetaParser.locales);

      const matched = flattenedPath.match(localUrlReg);
      return matched
        ? matched[1] || FileMetaParser.defaultLocale
        : FileMetaParser.defaultLocale;
    }

    return FileMetaParser.defaultLocale;
  }

  /**
   *
   * @param {string} flattenedPath
   */
  static getFileSlug(flattenedPath: string) {
    let newName = flattenedPath.replace(orderReg, '');

    if (FileMetaParser.locales && FileMetaParser.locales.length) {
      const localUrlReg = createLocalReg(FileMetaParser.locales);

      newName = newName.replace(localUrlReg, '');
    }
    return [newName, slug(newName)];
  }

  /**
   *
   * @param {string} flattenedPath
   */
  static getHref(flattenedPath: any) {
    return '/' + FileMetaParser.filePath2Slugs(flattenedPath).join('/');
  }

  /**
   *
   * @param {string} flattenedPath
   */
  static filePath2Slugs(flattenedPath: string) {
    return flattenedPath.split('/').map((path: any) => {
      const [, slug] = FileMetaParser.getFileSlug(path);
      return slug;
    });
  }

  /**
   *
   * @param {string} flattenedPath
   */
  static getMetaData(flattenedPath: string): MetaDataResult {
    const order = FileMetaParser.getFileOrder(flattenedPath);
    const locale = FileMetaParser.getFileLocale(flattenedPath);
    const name = flattenedPath.split('/').pop() || '';
    const [replaceName, slug] = FileMetaParser.getFileSlug(name);
    const pathsSlugs = FileMetaParser.filePath2Slugs(flattenedPath);

    const href = '/' + pathsSlugs.join('/');
    const fullHref =
      locale !== FileMetaParser.defaultLocale ? `/${locale}${href}` : href;

    return {
      order,
      locale,
      slug,
      pathsSlugs,
      fullHref,
      name,
      replaceName
    };
  }
}
