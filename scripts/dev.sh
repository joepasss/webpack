#!/usr/bin/env zsh

echo -e "\e[4;93mDEVELOPMENT MODE\e[0m"

echo -e "\e[1;33run eslint ...\e[0m"
yarn eslint ./src/**.tsx

export NODE_OPTIONS="--import ./register-hooks.js"
export NODE_ENV=dev

echo -e "\e[1;33mrun webpack dev server ...\e[0m"
yarn webpack serve --config ./webpack/webpack.dev.config.ts
