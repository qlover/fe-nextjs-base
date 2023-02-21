const { genI18n } = require('./genI18n')
const { genPageRoute } = require('./genPageRoute')
const { genUITheme } = require('./genUITheme')
const { genI18nTransType } = require('./genI18nTransType')
const { fixI18n } = require('./fixI18n')
const { genSvgIconComponent } = require('./genSvgIconComponent')
const { listenIp } = require('./listenIp')

module.exports = {
  genI18n,
  genPageRoute,
  genUITheme,
  genSvgIconComponent,
  genI18nTransType,
  fixI18n,
  listenIp
}
