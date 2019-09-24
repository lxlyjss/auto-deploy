#!/usr/bin/env bash
WEB_PATH='/home/node/article-manager/service/article-manager'

echo "Start deployment"
cd $WEB_PATH
echo "pulling source code..."
git reset --hard origin/master
git clean -f
git pull
git checkout master
npm install
npm run start
echo "Finished."
