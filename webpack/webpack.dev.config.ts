import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import commonConfig from "./webpack.common.config";
import { merge } from "webpack-merge";
import path from "path";

const devConfig: Configuration = merge(commonConfig, {
  mode: "development",
  output: {
    filename: "main.js",
  },
  devServer: {
    port: 9000,
    static: path.resolve(__dirname, "../dist"),
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
        test: /\.(scss|sass)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
});

export default devConfig;
