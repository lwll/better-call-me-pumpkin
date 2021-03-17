# 确保脚本抛出遇到的错误
set -e

git add -A
git commit -m 'deploy'
# git push "https://github.com/lwll/better-call-me-pumpkin.git"

git push "https://gitee.com/lwsmilence/better-call-me-pumpkin.git"