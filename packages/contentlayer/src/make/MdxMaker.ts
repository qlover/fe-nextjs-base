import {
  DocumentTypeDef,
  DocumentType,
  makeSource
} from 'contentlayer/source-files';

export class MdxMaker {
  typeStack: DocumentType<any>[] = [];

  addType<DefName extends string = string>(typeDef: DocumentTypeDef<DefName>) {
    this.typeStack.push(typeDef as unknown as DocumentType<any>);
    return this;
  }

  toSource() {
    return makeSource({
      contentDirPath: './resources/markdowns',
      documentTypes: this.typeStack
    });
  }
}
