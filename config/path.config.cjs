const { join } = require('path');

/**
 * 项目根路径
 */
const rootPath = join(__dirname, '../');

/**
 * scripts 根目录
 */
const srcriptsRootPath = join(rootPath, 'scripts');

/**
 * 打包静态资源的目录名
 */
const staticDirectoryName = 'out';
const staticDirectoryPath = join(rootPath, staticDirectoryName);

module.exports = {
  rootPath,
  srcriptsRootPath,
  staticDirectoryName,
  staticDirectoryPath
};
