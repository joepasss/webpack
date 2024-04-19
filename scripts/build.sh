#!/bin/bash

export NODE_OPTIONS="--import ./register-hooks.js"
yarn webpack --config ./webpack/webpack.prod.config.ts
