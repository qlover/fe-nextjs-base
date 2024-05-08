'use client';
import { logger } from '@/utils/pulgins';
import { allDocs } from 'contentlayer/generated';
import { Serialize } from 'packages/utils/Serialize';
import { ContentBuilder } from 'packages/contentlayer/src/builder/ContentBuilder';

const docs = allDocs.map((item) => ({
  _fileMetaData: item._fileMetaData
}));

const buildTree = (data: any[], pid: string) => {
  
};

export default function DocsRoot() {
  const treeStructure = buildTree(docs, 'docs');
  logger(treeStructure);
  // logger(new ContentBuilder().toTree(allDocs));
  return (
    <div>
      <pre style={{ width: '100%', height: 400, overflow: 'auto' }}>
        {Serialize.serialize(docs, null, 2)}
      </pre>
    </div>
  );
}
