const i18n = require("../../i18n");
const { fixI18n } = require("../scripts/fixI18n");
const { program } = require('commander');

program
  .option('--keep', '受否保留被替换文件内容')
  .option('--sort', '是否排序 json 内容')
  .option('-l, --locale <char>', `指定目标内容，可以是 ${i18n.locales.toString()} 中的一项`)

program.parse();


function toLocale(locale) {
  return i18n.locales.includes(locale) ? locale : i18n.defaultLocale
}

function main() {
  const options = program.opts();
  const { locale, keep, sort } = options || {}
  fixI18n(toLocale(locale), keep, sort)
}

main()