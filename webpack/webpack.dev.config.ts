import path from "path";
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import commonConfig from "./webpack.common.config";
import { merge } from "webpack-merge";

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const devConfig: Configuration = merge(commonConfig, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  devServer: {
    port: 9000,
    static: {
      directory: path.resolve(__dirname, ".."),
    },
    devMiddleware: {
      index: "index.html",
      writeToDisk: true,
    },
    client: {
      overlay: true,
    },
    liveReload: true,
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        loader: "style-loader",
      },
      {
        test: /\.(css|scss)$/,
        loader: "css-loader",
        options: {
          modules: {
            localIdentName: "[local]--[md4:hash:7]",
          },
        },
      },
      {
        test: /\.(css|scss)$/,
        loader: "postcss-loader",
      },
      {
        test: /\.scss$/,
        loader: "sass-loader",
      },
    ],
  },
});

export default devConfig;
