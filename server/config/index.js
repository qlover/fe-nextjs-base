const nextConfig = require('./next')
const pathConfig = require('./path.config')
const tailWindConfig = require('./tailwind')
const uiConfig = require('./ui.config')
const appConfig = require('./app.config')

module.exports = {
  ...appConfig,
  ...nextConfig,
  ...pathConfig,
  ...tailWindConfig,
  ...uiConfig
}
