const dotenv = require('dotenv')
const { nextDev } = require('next/dist/cli/next-dev')
const { listenIp } = require('../scripts/listenIp')

function getProjectEnv() {
  try {
    const env = dotenv.config({
      path: '.env.local'
    })
    return env.parsed
  } catch {
    return
  }
}

function main() {
  // const env = getProjectEnv()

  nextDev()

  listenIp()
}

main()
