import {
  ComputedFields,
  FieldDefs,
  defineDocumentType
} from 'contentlayer/source-files';
import { getCommonFields } from './config';
import { FileMetaParser } from './FileMetaParser';

export class MdxPrase<T extends string> {
  fields: FieldDefs;
  filePathPattern: string;
  computedFields: ComputedFields;

  static getDefaultFileMetaDataFields(): ComputedFields {
    return {
      _fileMetaData: {
        type: 'json',
        resolve: (doc) => {
          const flattenedPath = doc._raw.flattenedPath;

          const metaData = FileMetaParser.getMetaData(flattenedPath);
          const parentPath = flattenedPath.split('/').slice(0, -1).pop();

          return Object.assign(metaData, {
            parent: parentPath ? FileMetaParser.getMetaData(parentPath) : null
          });
        }
      }
    };
  }

  constructor(
    public name: T,
    filePathPattern?: string
  ) {
    this.filePathPattern =
      filePathPattern || `${name.toLocaleLowerCase()}/**/*.mdx`;
    this.fields = getCommonFields();
    this.computedFields = MdxPrase.getDefaultFileMetaDataFields();
  }

  extendsCommonFields(fields: FieldDefs) {
    this.fields = Object.assign(this.fields, fields);

    return this;
  }

  toDocumentType() {
    return defineDocumentType<T>(() => ({
      name: this.name,
      filePathPattern: this.filePathPattern,
      fields: this.fields,
      computedFields: this.computedFields
    }));
  }
}
