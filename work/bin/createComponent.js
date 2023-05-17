const { program } = require('commander')
const { genComponent } = require('../scripts/genComponent')

program.option('-n, --name <char>', `组件名`)

program.parse()

function main() {
  const options = program.opts()
  const { name } = options || {}
  const names = name.split('/')
  const componentName = names.pop()
  const path = names.join('/')
  genComponent(path, componentName)
}

main()
