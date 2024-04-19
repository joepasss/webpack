#!/bin/bash

export NODE_OPTIONS="--import ./register-hooks.js"
yarn webpack serve --config ./webpack/webpack.dev.config.ts
