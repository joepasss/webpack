#!/usr/bin/env zsh

echo -e "\e[4;93mPRODUCTION MODE\e[0m"

echo -e "\e[1;33run eslint ...\e[0m"
yarn eslint ./src/**.tsx

export NODE_OPTIONS="--import ./register-hooks.js"
export NODE_ENV=production

echo -e "\e[1;33mrun webpack dev server ...\e[0m"
yarn webpack --config ./webpack/webpack.analyze.config.ts
