#!/usr/bin/env sh
set -e

cd dist

git init
git checkout -B main
git add -A
git commit -m 'deploy'
git push -f git@github.com:sindre-kodehode/webgl.git main:gh-pages

cd -
