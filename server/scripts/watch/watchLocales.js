const chokidar = require('chokidar');
const { join } = require('path');
const i18n = require('../../../i18n');
const { localeRootPath } = require('../../config');
const { preLocalesRootPath } = require('../../util')
const { genI18nTransType } = require('../index')

const defaultLocalesPath = join(localeRootPath, i18n.defaultLocale)

/**
 * 监听 loclaes 目录，实时生成类型
 */
function watchLocales() {
  const localeRootPath = preLocalesRootPath()

  console.log('[watch:watchLocales] start');
  chokidar.watch(localeRootPath).on('all', (event, path) => {
    if (event === 'change' && path.includes(defaultLocalesPath)) {
      console.log(event, path);
      genI18nTransType()
    }
  });

}

module.exports = { watchLocales }