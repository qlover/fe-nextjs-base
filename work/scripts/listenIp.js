const { logger } = require('maroonlis-utils')
const chalk = require('chalk')
const ipaddr = require('ip')

let lastIp

function write() {
  const ip = ipaddr.address()
  if (lastIp !== ip) {
    logger.info(`${chalk.bold.green('Ip change')} ${ip}`)
  }
  lastIp = ip
}

let timer

function start() {
  timer = setTimeout(() => {
    write()
    start()
  }, 6000)
}

function listenIp() {
  try {
    write()
    start()
  } catch {
    clearTimeout(timer)
  }
}

module.exports = { listenIp }
