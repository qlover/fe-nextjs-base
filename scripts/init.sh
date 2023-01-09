# 初始化 husky
husky install
# 生成 git 提交 hooks
node node_modules/husky/lib/bin add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'

# 初始化版本发行
npm init release-it

# 初始化 changlog
npx commitizen init cz-conventional-changelog --save-dev --save-exact