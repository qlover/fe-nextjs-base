const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

function firstToUpper1(str) {
  return str.trim().replace(str[0], str[0].toUpperCase());
}

const getPageTpl = (name) =>
  `import React, { FC } from "react";

type ${name}Props = {

}
const ${name}: FC<${name}Props> = () => {
  return (
    <div className="${name}-wrapper"></div>
  );
}

export default ${name};
`;

(async function main(params) {
  const inputArgs = process.argv.slice(2);
  let [componentName, filepath] = inputArgs || [];

  if (!componentName) {
    console.log(chalk.red('请输入名称'));
    process.exit();
  }

  console.log(chalk.blue('Component create start!'));

  filepath =
    filepath === 'common' || filepath === 'pages' ? filepath : 'common';
  componentName = firstToUpper1(componentName);

  const pageRoot = path.join(
    __dirname,
    filepath === 'pages' ? '../pages/components' : '../components'
  );
  const dirPath = path.join(pageRoot, componentName);

  try {
    fs.mkdirSync(dirPath);
    let filePath = path.join(dirPath, 'index.tsx');
    fs.writeFileSync(filePath, getPageTpl(componentName), { flag: 'a' });

    console.log(chalk.green('Component created successfully!'));
  } catch (e) {
    console.log(chalk.red(e));
  }
})();
