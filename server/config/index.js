const nextConfig = require('./next.config')
const pathConfig = require('./path.config')
const tailWindConfig = require('./tailwind')
const uiConfig = require('./ui.config')

module.exports = {
  ...nextConfig,
  ...pathConfig,
  ...tailWindConfig,
  ...uiConfig
}
