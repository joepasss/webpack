import { Configuration } from "webpack";
import commonConfig from "./webpack.common.config";
import { merge } from "webpack-merge";

const devConfig: Configuration = merge(commonConfig, {
  mode: "development",
  output: {
    filename: "main.js",
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
